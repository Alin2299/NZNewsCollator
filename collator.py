# Import the necessary libraries
import feedparser
import mysql.connector
from datetime import datetime
import os

# Define the links to the relevant RSS feeds
rnz_politics_rss = "https://www.rnz.co.nz/rss/political.xml"

""" 
Define a dictionary representing the database configuration
that uses environment variables to obfuscate the actual values
"""
db_config = {
    "user": os.getenv("NEWS_COLLATOR_DB_USER"),
    "password": os.getenv("NEWS_COLLATOR_DB_PASSWORD"),
    "host": os.getenv("NEWS_COLLATOR_DB_HOST"),
    "database": os.getenv("NEWS_COLLATOR_DB_NAME")
}

# Parse and save the feeds
rnz_politics_feed = feedparser.parse(rnz_politics_rss)

# Define a list for all the articles/items
items = []

# Establish a connection to the appropriate database
conn = mysql.connector.connect(**db_config)

# Create a cursor to execute SQL commands
cursor = conn.cursor()

# Clear all existing items in the database
cursor.execute(
    """
    TRUNCATE TABLE nz_news_collator
    """
)

# Iterate through each RSS entry (in the RNZ feed)
for entry in rnz_politics_feed.entries:
    # Extract the relevant details (formatted appropriately)
    title = entry.title
    description = entry.description
    publishDate = datetime.strptime(entry.published, "%a, %d %b %Y %H:%M:%S %z")
    link = entry.link

    # Add the article to the database/table
    cursor.execute(
        """
        INSERT INTO nz_news_collator (title, description, publishDate, link)
        VALUES (%s, %s, %s, %s)
        """,
        (title, description, publishDate, link)
    )
# Commit the changes
conn.commit()

# Close the cursor and the connection
cursor.close()
conn.close()