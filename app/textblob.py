from textblob import TextBlob
import re


class Text_Sentiment():

    def __init__(self):
        pass

    def get_sentiment_polarity(self, text):
        """
        Runs TextBlob sentiment analysis on given string
            
            Parameters
            ----------
            text : string
            
            Returns
            -------
            polarity_score : float
                polarity score within the range [-1.0, 1.0]
        """
        blob = TextBlob(text)
        return blob.sentiment.polarity

    def clean_text(self, content):
        """
        Strips URLs and any punctuations in passed in parameter to enhance sentiment analysis.  
            
            Parameters
            ----------
            content : string
                Direct text section 
            
            Returns
            -------
            cleaned_string : string
                 text section as string without URLs and punctuations.
        """
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", content).split())
