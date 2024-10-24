from pymongo import MongoClient

try:
    client = MongoClient("mongodb+srv://Sanika:Sanika1234@cluster0.a8enq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client.get_database("mydatabase")
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Error: {e}")

