import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <!-- Welcome Screen -->
      <div class="welcome-screen" *ngIf="!testStarted && !viewingScore">
        <h1>Student Assessment Portal</h1>
        <div class="card">
          <div class="card-content">
            <h2>Ready to begin?</h2>
            <p>You have 10 minutes to complete the test. Good luck!</p>
            <div class="button-group">
              <button class="btn primary" (click)="startTest()">
                <span class="icon">▶</span> Start Test
              </button>
              <button class="btn secondary" (click)="viewscore()">
                <span class="icon">📊</span> View Results
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Test Questions -->
      <div class="test-container" *ngIf="testStarted">
        <div class="timer" [ngClass]="{'warning': timeLeft < 120}">
          <div class="clock-icon">⏱</div>
          <div class="time">{{ minutes }}:{{ seconds | number:'2.0-0' }}</div>
        </div>

        <div class="questions-wrapper">
          <div class="progress-bar">
            <div class="progress" [style.width.%]="getProgressPercentage()"></div>
          </div>

          <div *ngFor="let question of questions; let i = index" class="question-card">
            <div class="question-number">Question {{ i + 1 }} of {{ questions.length }}</div>
            <h3>{{ question.question_text }}</h3>
            
            <div class="image-container" *ngIf="question.image_url">
              <img [src]="'http://localhost:5000' + question.image_url" alt="Question Image" class="question-image">
            </div>

            <div class="options-container">
              <label *ngFor="let option of ['A', 'B', 'C', 'D']" class="option-label" [ngClass]="{'selected': selectedAnswers[question.id] === option}">
                <input 
                  type="radio" 
                  [name]="'answer' + question.id" 
                  [value]="option" 
                  [(ngModel)]="selectedAnswers[question.id]">
                <span class="option-marker">{{ option }}</span>
                <span class="option-text">{{ getOptionText(question, option) }}</span>
              </label>
            </div>
          </div>

          <div class="submit-container">
            <button class="btn submit" (click)="submitTest()">Submit Test</button>
          </div>
        </div>
      </div>

      <!-- Score Display -->
      <div class="score-container" *ngIf="viewingScore">
        <div class="card">
          <div class="card-header">
            <h2>Your Test History</h2>
            <button class="btn back" (click)="goBack()">← Back</button>
          </div>
          
          <div class="table-container">
            <table class="results-table">
              <thead>
                <tr>
                  <th>Test #</th>
                  <th>Score</th>
                  <th>Time Taken</th>
                  <th>Submitted On</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let submission of scoreData; let i = index" [ngClass]="{'highlight': i === 0}">
                  <td>{{ i + 1 }}</td>
                  <td class="score-cell">{{ submission.score }}</td>
                  <td>{{ formatTimeTaken(submission.time_taken) }}</td>
                  <td>{{ formatDate(submission.submitted_at) }}</td>
                </tr>
                <tr *ngIf="scoreData.length === 0">
                  <td colspan="4" class="no-data">No test records found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Global Styles */
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
    }

    h1, h2, h3 {
      font-weight: 600;
      color: #2c3e50;
    }

    /* Welcome Screen */
    .welcome-screen {
      text-align: center;
      margin-top: 50px;
    }

    .welcome-screen h1 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: #3498db;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }

    .card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    }

    .card-content {
      padding: 2rem;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background: #f8f9fa;
      border-bottom: 1px solid #eaeaea;
    }

    .card-header h2 {
      margin: 0;
    }

    /* Buttons */
    .button-group {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 30px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .primary {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
    }

    .primary:hover {
      background: linear-gradient(135deg, #2980b9, #3498db);
    }

    .secondary {
      background: linear-gradient(135deg, #ecf0f1, #bdc3c7);
      color: #2c3e50;
    }

    .secondary:hover {
      background: linear-gradient(135deg, #bdc3c7, #ecf0f1);
    }

    .submit {
      background: linear-gradient(135deg, #27ae60, #2ecc71);
      color: white;
      font-size: 1.1rem;
      padding: 14px 40px;
    }

    .submit:hover {
      background: linear-gradient(135deg, #2ecc71, #27ae60);
    }

    .back {
      background: transparent;
      color: #3498db;
      padding: 8px 16px;
    }

    .back:hover {
      background: #f1f5f9;
    }

    .icon {
      font-size: 1.2rem;
    }

    /* Test Container */
    .test-container {
      position: relative;
      padding-top: 60px;
    }

    .timer {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      padding: 10px 20px;
      border-radius: 50px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      margin: 0 auto 20px;
      width: 120px;
      z-index: 10;
      transition: all 0.3s ease;
    }

    .timer.warning {
      background: #ff7675;
      color: white;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .clock-icon {
      font-size: 1.3rem;
      margin-right: 8px;
    }

    .time {
      font-size: 1.2rem;
      font-weight: 700;
    }

    .questions-wrapper {
      background: white;
      border-radius: 10px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.1);
      padding: 20px;
    }

    .progress-bar {
      height: 6px;
      background: #e0e0e0;
      border-radius: 10px;
      margin-bottom: 20px;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      background: linear-gradient(90deg, #3498db, #9b59b6);
      border-radius: 10px;
      transition: width 0.3s ease;
    }

    .question-card {
      margin-bottom: 30px;
      padding: 20px;
      border-radius: 8px;
      background: #f8f9fa;
      border-left: 4px solid #3498db;
    }

    .question-number {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 10px;
    }

    .image-container {
      margin: 15px 0;
      text-align: center;
    }

    .question-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .options-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 20px;
    }

    .option-label {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      background: white;
      border: 1px solid #e0e0e0;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .option-label:hover {
      background: #f1f5f9;
      transform: translateX(5px);
    }

    .option-label.selected {
      background: #e3f2fd;
      border-color: #3498db;
    }

    .option-label input {
      position: absolute;
      opacity: 0;
    }

    .option-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background: #f1f5f9;
      border-radius: 50%;
      margin-right: 15px;
      font-weight: bold;
      color: #3498db;
    }

    .selected .option-marker {
      background: #3498db;
      color: white;
    }

    .option-text {
      flex: 1;
    }

    .submit-container {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }

    /* Score Container */
    .score-container {
      margin-top: 30px;
    }

    .table-container {
      overflow-x: auto;
      padding: 20px;
    }

    .results-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      border-radius: 8px;
      overflow: hidden;
    }

    .results-table th {
      background: #f1f5f9;
      padding: 15px;
      font-weight: 600;
      color: #2c3e50;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 0.5px;
    }

    .results-table td {
      padding: 15px;
      border-bottom: 1px solid #eaeaea;
    }

    .results-table tbody tr:last-child td {
      border-bottom: none;
    }

    .results-table tbody tr:hover {
      background: #f8f9fa;
    }

    .score-cell {
      font-weight: 700;
      color: #27ae60;
    }

    .highlight {
      background: #ebf5ff;
    }

    .no-data {
      text-align: center;
      color: #7f8c8d;
      padding: 30px !important;
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }

      .button-group {
        flex-direction: column;
        gap: 10px;
      }

      .card-header {
        flex-direction: column;
        gap: 10px;
      }

      .option-label {
        padding: 10px;
      }
    }
  `]
})
export class StudentTestComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [key: number]: string } = {};
  testStarted: boolean = false;
  viewingScore: boolean = false;
  startTime: number = 0;
  timer: any;
  timeLeft: number = 600; // 10 minutes
  minutes: number = 10;
  seconds: number = 0;
  scoreData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  startTest() {
    this.http.get<any[]>('http://localhost:5000/api/questions').subscribe(data => {
      this.questions = data;
      this.testStarted = true;
      this.startTime = Date.now();
      this.startTimer();
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.minutes = Math.floor(this.timeLeft / 60);
        this.seconds = this.timeLeft % 60;
      } else {
        clearInterval(this.timer);
        this.submitTest();
      }
    }, 1000);
  }

  submitTest() {
    clearInterval(this.timer);
    const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
    const submissionData = {
      studentName: localStorage.getItem('email'),
      answers: this.selectedAnswers,
      timeTaken: timeTaken,
      score: 0 // To be calculated later
    };
    
    this.http.post('http://localhost:5000/api/questions/submit-test', submissionData).subscribe(response => {
      console.log("Test submitted", response);
      alert("Test submitted successfully!");
      this.testStarted = false;
    });
  }

  viewscore() {
    const studentEmail = localStorage.getItem('email');

    if (!studentEmail) {
      alert("No student email found. Please log in again.");
      return;
    }

    this.http.get<any[]>(`http://localhost:5000/api/score/getscore/${studentEmail}`).subscribe(
      (data) => {
        console.log("Test Submissions:", data);
        this.scoreData = data;
        this.viewingScore = true;
        this.testStarted = false;
      },
      (error) => {
        console.error("Error fetching scores:", error);
        alert("Failed to load scores. Please try again.");
      }
    );
  }

  goBack() {
    this.viewingScore = false;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  formatTimeTaken(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  getOptionText(question: any, option: string): string {
    return question[`option_${option.toLowerCase()}`] || '';
  }

  getProgressPercentage(): number {
    const totalQuestions = this.questions.length;
    if (totalQuestions === 0) return 0;
    
    const answered = Object.keys(this.selectedAnswers).length;
    return (answered / totalQuestions) * 100;
  }
}