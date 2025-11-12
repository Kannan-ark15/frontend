// In your parent component
import { Component } from '@angular/core';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcase } from '../project-showcase/project-showcase';

export const SENTIMENT_ANALYSIS_PROJECT: ProjectShowcaseData = {
  title: 'AI Movie Recommender',
  subtitle: 'Content-Based Recommendation using Sentiment Analysis',
  description: 'A hybrid recommender system that combines content-based filtering with real-time Twitter sentiment analysis to provide personalized movie recommendations powered by deep learning.',
  techStack: ['PyTorch', 'Python', 'Android', 'Java', 'Google Cloud', 'Twitter API'],
  videoUrl: 'assets/videos/movie-recommender-demo.mp4',
  badge: 'AI POWERED',
  chapters: [
    {
      id: 1,
      title: 'The Problem Statement',
      content: 'Traditional movie recommendation systems rely solely on user ratings and collaborative filtering, which often fail to capture real-time public sentiment and genuine user opinions. With millions of tweets and social media discussions about movies happening daily, there was a massive untapped data source that could significantly improve recommendation accuracy. Users needed a system that not only understands their preferences but also considers current public sentiment about movies.',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
      color: '#e50914'
    },
    {
      id: 2,
      title: 'Research & Architecture Design',
      content: 'After extensive research, we designed a hybrid architecture that merges content-based filtering with sentiment analysis. The system would analyze Twitter data using a PyTorch-based deep learning model to generate dynamic movie ratings. We chose to build a three-tier architecture: Android mobile app for user interface, Python Flask backend for recommendation logic, and Google Cloud App Engine for scalable deployment. The sentiment analysis model would be trained on preprocessed tweet data to classify sentiments and generate rating scores.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      color: '#b20710'
    },
    {
      id: 3,
      title: 'Building the Sentiment Model',
      content: 'We developed a custom deep learning model in PyTorch trained on thousands of movie-related tweets. The preprocessing pipeline cleaned and tokenized tweet data, removing noise and extracting meaningful features. The model architecture consisted of embedding layers, LSTM networks, and fully connected layers to capture sequential patterns in text. Training was performed on Google Colab utilizing GPU acceleration for faster convergence. The model achieved high accuracy in classifying tweet sentiments as positive, negative, or neutral.',
      code: `# Sentiment Analysis Model Training
class SentimentLSTM(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim):
        super(SentimentLSTM, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, 3)  # 3 classes
        
    def forward(self, x):
        embedded = self.embedding(x)
        lstm_out, _ = self.lstm(embedded)
        output = self.fc(lstm_out[:, -1, :])
        return output

# Training loop
model = SentimentLSTM(vocab_size=10000, embedding_dim=128, hidden_dim=256)
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

for epoch in range(num_epochs):
    for tweets, labels in train_loader:
        optimizer.zero_grad()
        predictions = model(tweets)
        loss = criterion(predictions, labels)
        loss.backward()
        optimizer.step()`,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
      color: '#8b0000'
    },
    {
      id: 4,
      title: 'Twitter Integration & Rating System',
      content: 'We integrated Twitter API to fetch real-time tweets about movies. The TwitterAnalyzer module searches for tweets based on movie titles and passes them through our sentiment model. For each movie, we calculate the percentage of positive tweets to generate a dynamic rating score. This rating is then fused with user preference scores from content-based filtering. Movies with the highest combined scores are recommended to users. The system also features a live Twitter sentiment analyzer where users can search any topic and see real-time sentiment distribution.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      color: '#ff6b6b'
    },
    {
      id: 5,
      title: 'Android App Development',
      content: 'We built a native Android application with an intuitive user interface featuring multiple fragments. The Home fragment displays personalized recommendations, the Explore fragment shows trending movies using TheMovieDB API, and the Search fragment allows users to find specific movies and view their sentiment analysis. Users can like or dislike movies, which are stored in a local database and used to refine future recommendations. Movie details and posters are fetched from OMDB API, providing rich visual content.',
      code: `// Movie Recommendation API Call
public void getRecommendations() {
    String apiUrl = "https://major-project-final-246818.appspot.com/recommend";
    
    JsonObjectRequest request = new JsonObjectRequest(
        Request.Method.POST, apiUrl, userLikesJson,
        response -> {
            JSONArray movies = response.getJSONArray("recommendations");
            for (int i = 0; i < movies.length(); i++) {
                JSONObject movie = movies.getJSONObject(i);
                String title = movie.getString("title");
                double score = movie.getDouble("score");
                // Display recommendations
            }
        },
        error -> Toast.makeText(this, "Error fetching recommendations", Toast.LENGTH_SHORT).show()
    );
    
    requestQueue.add(request);
}`,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      color: '#ff9f1c'
    },
    {
      id: 6,
      title: 'Google Cloud Deployment',
      content: 'The backend was deployed on Google Cloud App Engine, providing automatic scaling and high availability. We created REST API endpoints for movie recommendations, sentiment analysis, and user data management. The Flask application handles requests from the Android app, processes them using the recommendation algorithm and sentiment model, and returns JSON responses. The deployment process involved configuring app.yaml, managing dependencies, and optimizing the model checkpoint file size for cloud storage constraints.',
      code: `# Flask API Endpoint for Recommendations
from flask import Flask, request, jsonify
import torch

app = Flask(__name__)
model = torch.load('sentiment_model.pth')

@app.route('/recommend', methods=['POST'])
def recommend_movies():
    user_likes = request.json['likes']
    
    # Get content-based recommendations
    candidate_movies = content_based_filter(user_likes)
    
    # Analyze sentiment for each movie
    recommendations = []
    for movie in candidate_movies:
        sentiment_score = analyze_twitter_sentiment(movie['title'])
        final_score = calculate_hybrid_score(
            movie['content_score'], 
            sentiment_score
        )
        recommendations.append({
            'title': movie['title'],
            'score': final_score,
            'poster': movie['poster_url']
        })
    
    return jsonify({'recommendations': sorted(recommendations, 
                    key=lambda x: x['score'], reverse=True)[:10]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)`,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      color: '#2ec4b6'
    },
    {
      id: 7,
      title: 'Impact & Results',
      content: 'The hybrid recommendation system significantly outperformed traditional content-based filtering by incorporating real-time sentiment data. Users reported more relevant and timely recommendations, especially for newly released movies with active social media discussions. The sentiment analyzer achieved 87% accuracy on test data, and the mobile app received positive feedback for its intuitive interface and unique sentiment visualization features. The system successfully demonstrated how combining multiple data sources—user preferences, content features, and public sentiment—creates a more robust recommendation engine.',
      metrics: [
        { label: 'Model Accuracy', value: '87%', icon: '🎯' },
        { label: 'API Response', value: '<2s', icon: '⚡' },
        { label: 'Recommendations', value: '10K+', icon: '🎬' },
        { label: 'User Satisfaction', value: '4.5/5', icon: '⭐' }
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      color: '#9b59b6'
    },
    {
      id: 8,
      title: 'Behind the Scenes',
      content: 'The project was built during a major academic project timeline, requiring coordination across multiple technologies and APIs 🔧. Debugging the PyTorch model training on limited GPU resources was challenging but rewarding 💪. The Twitter API rate limits forced us to implement smart caching strategies ⚙️. Deploying to Google Cloud for the first time involved a steep learning curve but taught valuable DevOps skills ☁️. The most satisfying moment was seeing real-time sentiment analysis work flawlessly on live tweets 🎉. Open-sourced on GitHub under MIT license to help other developers build similar systems 🌟.',
      image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop',
      color: '#e91e63'
    }
  ]
};


@Component({
  selector: 'app-movie-recommendation-project',
  standalone: true,
  imports: [CommonModule,AppNavbarComponent,ProjectShowcase],
  template: `
    <app-navbar [menuItems]="menuItems"></app-navbar>
    <app-project-showcase [projectData]="sentimentProject"></app-project-showcase>
  `
})
export class ProjectsComponent {
       menuItems = [
    { label: 'Experience', route: '/experience' },
    { label: 'Skills', route: '/skills' },
    { label: 'Projects', route: '/profile' },
    { label: 'Contact Me', route: '/contact' }
  ];
  sentimentProject = SENTIMENT_ANALYSIS_PROJECT;
}
