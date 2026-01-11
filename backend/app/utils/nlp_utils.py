"""
Round-2 NLP Enhancement Utilities
Uses pretrained models only - no training required
"""

import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import Dict, List, Tuple, Optional

# Load pretrained spaCy model (small English model)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback if model not installed
    nlp = None

# Global TF-IDF vectorizer for duplicate detection
tfidf_vectorizer = TfidfVectorizer(
    max_features=1000,
    stop_words='english',
    ngram_range=(1, 2)
)

# Store processed texts for similarity comparison
processed_texts = []
tfidf_matrix = None

def extract_entities(text: str) -> Dict[str, List[str]]:
    """
    Extract named entities using pretrained spaCy model
    Returns locations, organizations, and other important entities
    """
    if not nlp:
        return {"locations": [], "organizations": [], "persons": []}
    
    doc = nlp(text)
    entities = {
        "locations": [],
        "organizations": [], 
        "persons": []
    }
    
    for ent in doc.ents:
        if ent.label_ in ["GPE", "LOC"]:  # Geopolitical entities, locations
            entities["locations"].append(ent.text)
        elif ent.label_ in ["ORG"]:  # Organizations
            entities["organizations"].append(ent.text)
        elif ent.label_ in ["PERSON"]:  # Persons
            entities["persons"].append(ent.text)
    
    # Remove duplicates
    for key in entities:
        entities[key] = list(set(entities[key]))
    
    return entities

def clean_text(text: str) -> str:
    """
    Basic text cleaning using spaCy
    Removes extra whitespace, normalizes text
    """
    if not nlp:
        return text.strip()
    
    doc = nlp(text)
    # Remove extra whitespace and normalize
    cleaned = " ".join([token.text for token in doc if not token.is_space])
    return cleaned

def find_similar_grievances(new_text: str, threshold: float = 0.7) -> Optional[Dict]:
    """
    Find similar grievances using TF-IDF + cosine similarity
    Returns similarity info if duplicate found above threshold
    """
    global processed_texts, tfidf_matrix, tfidf_vectorizer
    
    if not processed_texts:
        return None
    
    try:
        # Add new text to comparison
        all_texts = processed_texts + [new_text]
        
        # Fit TF-IDF on all texts
        tfidf_matrix = tfidf_vectorizer.fit_transform(all_texts)
        
        # Get similarity scores for new text against all existing texts
        new_text_vector = tfidf_matrix[-1]
        existing_vectors = tfidf_matrix[:-1]
        
        similarities = cosine_similarity(new_text_vector, existing_vectors).flatten()
        
        # Find highest similarity
        max_similarity = np.max(similarities) if len(similarities) > 0 else 0.0
        
        if max_similarity >= threshold:
            similar_index = np.argmax(similarities)
            return {
                "is_duplicate": True,
                "similarity_score": float(max_similarity),
                "similar_grievance_index": int(similar_index)
            }
        
        return {
            "is_duplicate": False,
            "similarity_score": float(max_similarity),
            "similar_grievance_index": None
        }
    
    except Exception as e:
        # Fallback if NLP processing fails
        return {
            "is_duplicate": False,
            "similarity_score": 0.0,
            "similar_grievance_index": None,
            "error": str(e)
        }

def add_to_similarity_database(text: str):
    """
    Add processed text to similarity database for future comparisons
    """
    global processed_texts
    processed_texts.append(text)

def get_nlp_insights(title: str, description: str) -> Dict:
    """
    Main function to get all NLP insights for a grievance
    Combines entity extraction, text cleaning, and similarity detection
    """
    full_text = f"{title} {description}"
    
    # Extract entities
    entities = extract_entities(full_text)
    
    # Clean text
    cleaned_text = clean_text(full_text)
    
    # Check for similar grievances
    similarity_info = find_similar_grievances(cleaned_text)
    
    # Add to database for future comparisons
    add_to_similarity_database(cleaned_text)
    
    return {
        "entities": entities,
        "cleaned_text": cleaned_text,
        "similarity": similarity_info,
        "nlp_enabled": nlp is not None
    }