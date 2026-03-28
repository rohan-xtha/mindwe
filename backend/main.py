from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, auth, firestore  # Import firestore
from pydantic import BaseModel  # Import BaseModel for Pydantic models
from typing import List, Optional
import datetime

from auth import get_current_user  # Import the authentication dependency

# Load environment variables from .env file
load_dotenv()

# Initialize Firebase Admin SDK
firebase_service_account_key_path = os.getenv(
    "FIREBASE_SERVICE_ACCOUNT_KEY_PATH")
if not firebase_service_account_key_path:
    raise ValueError(
        "FIREBASE_SERVICE_ACCOUNT_KEY_PATH not found in .env file")

cred = credentials.Certificate(firebase_service_account_key_path)
firebase_admin.initialize_app(cred)

# Initialize Firestore client
db = firestore.client()

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Allow your frontend to access the backend
    # You can add other origins here if needed (e.g., your deployed frontend URL)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for chat messages


class ChatMessage(BaseModel):
    receiver_id: str
    content: str


class MessageResponse(BaseModel):
    id: str
    sender_id: str
    receiver_id: str
    conversation_id: str
    content: str
    timestamp: datetime.datetime
    read: bool = False

# Pydantic models for posts


class PostCreate(BaseModel):
    content: str


class PostResponse(BaseModel):
    id: str
    author_id: str
    content: str
    timestamp: datetime.datetime
    likes_count: int = 0


@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI backend! Firebase initialized."}


@app.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    """
    A sample protected route that requires Firebase authentication.
    Returns the UID of the authenticated user.
    """
    return {"message": f"Welcome, authenticated user! Your UID is: {current_user['uid']}"}


@app.post("/chat/message", response_model=MessageResponse)
async def send_chat_message(
    message: ChatMessage, current_user: dict = Depends(get_current_user)
):
    """
    Sends a chat message from the authenticated user to another user.
    """
    sender_id = current_user["uid"]
    receiver_id = message.receiver_id
    content = message.content

    # Create a conversation ID by sorting the two UIDs to ensure consistency
    participants = sorted([sender_id, receiver_id])
    conversation_id = "_".join(participants)

    message_data = {
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "content": content,
        "timestamp": datetime.datetime.now(datetime.timezone.utc),
        "read": False,
    }

    try:
        # Add message to a subcollection within the conversation document
        doc_ref = await db.collection("chats").document(conversation_id).collection("messages").add(message_data)

        # Return the created message with its ID
        return MessageResponse(id=doc_ref[1].id, conversation_id=conversation_id, **message_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send message: {e}",
        )


@app.get("/chat/history/{receiver_id}", response_model=List[MessageResponse])
async def get_chat_history(
    receiver_id: str, current_user: dict = Depends(get_current_user)
):
    """
    Retrieves the chat history between the authenticated user and a specific receiver.
    """
    sender_id = current_user["uid"]

    # Recreate the conversation ID
    participants = sorted([sender_id, receiver_id])
    conversation_id = "_".join(participants)

    try:
        messages_ref = db.collection("chats").document(
            conversation_id).collection("messages")
        query = messages_ref.order_by("timestamp").stream()

        messages = []
        for doc in query:
            msg_data = doc.to_dict()
            messages.append(MessageResponse(
                id=doc.id, conversation_id=conversation_id, **msg_data))
        return messages
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve chat history: {e}",
        )


@app.post("/posts", response_model=PostResponse)
async def create_post(
    post: PostCreate, current_user: dict = Depends(get_current_user)
):
    """
    Creates a new "Shared Voices" post.
    """
    author_id = current_user["uid"]
    content = post.content

    post_data = {
        "author_id": author_id,
        "content": content,
        "timestamp": datetime.datetime.now(datetime.timezone.utc),
        "likes_count": 0,
    }

    try:
        doc_ref = await db.collection("posts").add(post_data)
        return PostResponse(id=doc_ref[1].id, **post_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create post: {e}",
        )


@app.get("/posts", response_model=List[PostResponse])
async def get_all_posts(current_user: dict = Depends(get_current_user)):
    """
    Retrieves all "Shared Voices" posts, ordered by timestamp.
    """
    try:
        posts_ref = db.collection("posts")
        query = posts_ref.order_by(
            "timestamp", direction=firestore.Query.DESCENDING).stream()

        posts = []
        for doc in query:
            post_data = doc.to_dict()
            posts.append(PostResponse(id=doc.id, **post_data))
        return posts
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve posts: {e}",
        )
