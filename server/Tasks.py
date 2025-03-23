class Task:
    def __init__(self, title: str, description: str, status: str):
        self.title = title
        self.description = description
        self.status = status
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def __str__(self):
        return f"{self.title} - {self.description} - {self.status}"
    
