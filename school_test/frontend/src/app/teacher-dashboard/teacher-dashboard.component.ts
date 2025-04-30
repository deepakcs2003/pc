import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
    <div class="dashboard-container">
      <div class="header">
        <h1>Teacher Dashboard</h1>
        <div class="actions">
          <button class="btn primary" (click)="toggleCreateQuestion()">
            <span class="icon">➕</span> Create Question
          </button>
          <button class="btn secondary" (click)="toggleViewQuestions()">
            <span class="icon">📋</span> View Question Bank
          </button>
          <button class="btn accent" (click)="monitorTests()">
            <span class="icon">📊</span> Monitor Tests
          </button>
        </div>
      </div>

      <!-- Create Question Form -->
      <div *ngIf="showCreateForm && !showQuestionBank" class="card create-question-form">
        <div class="card-header">
          <h2>{{ questionForm.value.id ? 'Edit Question' : 'Add a New Question' }}</h2>
          <button class="btn-close" (click)="resetForm()">✕</button>
        </div>
        
        <form [formGroup]="questionForm" (ngSubmit)="submitQuestion()" enctype="multipart/form-data">
          <div class="form-group">
            <label for="question_text">Question</label>
            <textarea 
              id="question_text" 
              placeholder="Enter your question here" 
              formControlName="question_text"
              rows="3"
            ></textarea>
            <div class="validation-error" *ngIf="questionForm.get('question_text')?.invalid && questionForm.get('question_text')?.touched">
              Question text is required
            </div>
          </div>
          
          <div class="options-grid">
            <div class="form-group">
              <label for="option_a">Option A</label>
              <input type="text" id="option_a" placeholder="Option A" formControlName="option_a">
              <div class="validation-error" *ngIf="questionForm.get('option_a')?.invalid && questionForm.get('option_a')?.touched">
                Option A is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="option_b">Option B</label>
              <input type="text" id="option_b" placeholder="Option B" formControlName="option_b">
              <div class="validation-error" *ngIf="questionForm.get('option_b')?.invalid && questionForm.get('option_b')?.touched">
                Option B is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="option_c">Option C</label>
              <input type="text" id="option_c" placeholder="Option C" formControlName="option_c">
              <div class="validation-error" *ngIf="questionForm.get('option_c')?.invalid && questionForm.get('option_c')?.touched">
                Option C is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="option_d">Option D</label>
              <input type="text" id="option_d" placeholder="Option D" formControlName="option_d">
              <div class="validation-error" *ngIf="questionForm.get('option_d')?.invalid && questionForm.get('option_d')?.touched">
                Option D is required
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="correct_option">Correct Answer</label>
              <select id="correct_option" formControlName="correct_option">
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
            
            <div class="form-group file-upload">
              <label for="image">Question Image (Optional)</label>
              <div class="file-input-container">
                <input 
                  type="file" 
                  id="image" 
                  class="file-input" 
                  (change)="onFileSelected($event)"
                  accept="image/*"
                >
                <div class="file-input-label">
                  <span class="icon">📁</span> 
                  {{ selectedFile ? selectedFile.name : 'Choose an image' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Image -->
          <div class="image-preview" *ngIf="previewImage">
            <h3>Image Preview</h3>
            <img [src]="previewImage" alt="Preview">
            <button type="button" class="btn-remove" (click)="removeImage()">Remove Image</button>
          </div>

          <div class="form-actions">
            <button type="button" class="btn cancel" (click)="resetForm()">Cancel</button>
            <button type="submit" class="btn submit" [disabled]="questionForm.invalid">
              {{ questionForm.value.id ? 'Update Question' : 'Add Question' }}
            </button>
          </div>
        </form>
      </div>

      <!-- View & Manage Questions -->
      <div *ngIf="showQuestionBank && !showCreateForm" class="card question-bank">
        <div class="card-header">
          <h2>Question Bank</h2>
          <button class="btn-back" (click)="goBack()">← Back</button>
        </div>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Options</th>
                <th>Correct Answer</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let question of questions">
                <td class="question-text">{{ question.question_text }}</td>
                <td class="options-list">
                  <div><span class="option-label">A:</span> {{ question.option_a }}</div>
                  <div><span class="option-label">B:</span> {{ question.option_b }}</div>
                  <div><span class="option-label">C:</span> {{ question.option_c }}</div>
                  <div><span class="option-label">D:</span> {{ question.option_d }}</div>
                </td>
                <td class="correct-answer">{{ question.correct_option }}</td>
                <td class="image-cell">
                  <img *ngIf="question.image_url" [src]="'http://localhost:5000' + question.image_url" alt="Question Image">
                  <span *ngIf="!question.image_url" class="no-image">No image</span>
                </td>
                <td class="actions-cell">
                  <button class="btn-edit" (click)="editQuestion(question)">Edit</button>
                  <button class="btn-delete" (click)="deleteQuestion(question.id)">Delete</button>
                </td>
              </tr>
              <tr *ngIf="questions.length === 0">
                <td colspan="5" class="no-data">No questions available. Create your first question!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Monitor Test Submissions -->
      <div *ngIf="showTestSubmissions" class="card test-submissions">
        <div class="card-header">
          <h2>Student Test Submissions</h2>
          <button class="btn-back" (click)="goBack()">← Back</button>
        </div>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Score</th>
                <th>Time</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let submission of testSubmissions">
                <td>{{ submission.student_name }}</td>
                <td class="score-cell">{{ submission.score }}</td>
                <td>{{ formatTimeTaken(submission.time_taken) }}</td>
                <td>{{ formatDate(submission.submitted_at) }}</td>
              </tr>
              <tr *ngIf="testSubmissions.length === 0">
                <td colspan="4" class="no-data">No test submissions yet.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Global Styles */
    :host {
      --primary-color: #3498db;
      --primary-dark: #2980b9;
      --secondary-color: #f1f5f9;
      --accent-color: #6c5ce7;
      --success-color: #27ae60;
      --danger-color: #e74c3c;
      --warning-color: #f39c12;
      --text-color: #2c3e50;
      --light-text: #7f8c8d;
      --border-color: #e0e0e0;
      --card-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      --transition: all 0.3s ease;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: var(--text-color);
    }

    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    /* Header Styles */
    .header {
      margin-bottom: 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 20px;
      font-weight: 700;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }

    /* Card Styles */
    .card {
      background: white;
      border-radius: 12px;
      box-shadow: var(--card-shadow);
      margin-bottom: 30px;
      overflow: hidden;
      transition: var(--transition);
    }

    .card:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      background: var(--secondary-color);
      border-bottom: 1px solid var(--border-color);
    }

    .card-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--text-color);
      font-weight: 600;
    }

    /* Button Styles */
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition);
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .primary {
      background: var(--primary-color);
      color: white;
    }

    .primary:hover {
      background: var(--primary-dark);
    }

    .secondary {
      background: var(--secondary-color);
      color: var(--text-color);
    }

    .secondary:hover {
      background: #e4eaf3;
    }

    .accent {
      background: var(--accent-color);
      color: white;
    }

    .accent:hover {
      background: #5649d1;
    }

    .cancel {
      background: #f8f9fa;
      color: var(--text-color);
    }

    .submit {
      background: var(--success-color);
      color: white;
    }

    .submit:hover {
      background: #219653;
    }

    .btn-edit {
      background: var(--primary-color);
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 8px;
      transition: var(--transition);
    }

    .btn-edit:hover {
      background: var(--primary-dark);
    }

    .btn-delete {
      background: var(--danger-color);
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-delete:hover {
      background: #c0392b;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: var(--light-text);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 5px;
      transition: var(--transition);
    }

    .btn-close:hover {
      color: var(--danger-color);
    }

    .btn-back {
      color: var(--primary-color);
      background: transparent;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: var(--transition);
    }

    .btn-back:hover {
      color: var(--primary-dark);
    }

    .btn-remove {
      background: #f1f1f1;
      color: var(--danger-color);
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
      transition: var(--transition);
    }

    .btn-remove:hover {
      background: #e0e0e0;
    }

    .icon {
      font-size: 1.1rem;
    }

    /* Form Styles */
    .create-question-form {
      max-width: 800px;
      margin: 0 auto;
    }

    form {
      padding: 25px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--text-color);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 12px 15px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      font-size: 16px;
      transition: var(--transition);
      background: #f9fafb;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary-color);
      background: white;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }

    .validation-error {
      color: var(--danger-color);
      font-size: 0.85rem;
      margin-top: 5px;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-row .form-group {
      flex: 1;
      margin-bottom: 0;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 30px;
    }

    /* File Upload Styling */
    .file-input-container {
      position: relative;
    }

    .file-input {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 2;
    }

    .file-input-label {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 15px;
      border-radius: 8px;
      border: 1px dashed var(--border-color);
      background: #f9fafb;
      transition: var(--transition);
      cursor: pointer;
    }

    .file-input-label:hover {
      border-color: var(--primary-color);
      background: white;
    }

    /* Image Preview */
    .image-preview {
      margin-top: 20px;
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
      text-align: center;
    }

    .image-preview h3 {
      margin-top: 0;
      font-size: 1rem;
      color: var(--light-text);
    }

    .image-preview img {
      max-width: 100%;
      max-height: 300px;
      border-radius: 5px;
      margin: 10px 0;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }

    /* Table Styles */
    .table-container {
      padding: 20px;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    th {
      background: #f8f9fa;
      color: var(--text-color);
      font-weight: 600;
      text-align: left;
      padding: 15px;
      border-bottom: 2px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 1;
    }

    td {
      padding: 15px;
      border-bottom: 1px solid var(--border-color);
      vertical-align: top;
    }

    tbody tr:hover {
      background: #f9fafb;
    }

    .question-text {
      max-width: 300px;
      word-break: break-word;
    }

    .options-list div {
      margin-bottom: 5px;
    }

    .option-label {
      font-weight: 600;
      color: var(--primary-color);
      margin-right: 5px;
    }

    .correct-answer {
      font-weight: 700;
      color: var(--success-color);
      text-align: center;
    }

    .image-cell {
      text-align: center;
    }

    .image-cell img {
      max-width: 80px;
      max-height: 80px;
      border-radius: 5px;
      object-fit: cover;
      border: 1px solid var(--border-color);
    }

    .no-image {
      color: var(--light-text);
      font-size: 0.9rem;
    }

    .actions-cell {
      white-space: nowrap;
      text-align: center;
    }

    .no-data {
      text-align: center;
      color: var(--light-text);
      padding: 30px;
    }

    .score-cell {
      font-weight: 700;
      color: var(--success-color);
      text-align: center;
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .options-grid {
        grid-template-columns: 1fr;
      }

      .form-row {
        flex-direction: column;
        gap: 15px;
      }

      .actions {
        flex-direction: column;
        align-items: stretch;
      }

      .btn {
        justify-content: center;
      }

      th, td {
        padding: 10px;
      }

      .card-header {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }
    }
  `]
})
export class TeacherDashboardComponent implements OnInit {
  showCreateForm = false;
  showQuestionBank = false;
  showTestSubmissions = false;
  questionForm: FormGroup;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  questions: any[] = [];
  testSubmissions: any[] = [];


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.questionForm = this.fb.group({
      question_text: ['', Validators.required],
      option_a: ['', Validators.required],
      option_b: ['', Validators.required],
      option_c: ['', Validators.required],
      option_d: ['', Validators.required],
      correct_option: ['A', Validators.required]
    });
  }

  ngOnInit() {
    this.loadQuestions();
  }

  toggleCreateQuestion() {
    this.showCreateForm = true;
    this.showQuestionBank = false; // Hide question bank when showing form
    this.showTestSubmissions = false;
  }

  toggleViewQuestions() {
    this.showCreateForm = false;
    this.showQuestionBank = true; // Hide form when viewing questions
    this.showTestSubmissions = false;
    this.loadQuestions();
  }

  loadQuestions() {
    this.http.get('http://localhost:5000/api/questions').subscribe((data: any) => {
      this.questions = data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewImage = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewImage = null;
    this.selectedFile = null;
  }

  submitQuestion() {
    if (this.questionForm.valid) {
      const questionId = this.questionForm.value.id;
  
      if (questionId) {
        // Editing existing question
        const updatedData = {
          question_text: this.questionForm.value.question_text,
          option_a: this.questionForm.value.option_a,
          option_b: this.questionForm.value.option_b,
          option_c: this.questionForm.value.option_c,
          option_d: this.questionForm.value.option_d,
          correct_option: this.questionForm.value.correct_option
        };
  
        this.http.put(`http://localhost:5000/api/questions/${questionId}`, updatedData)
          .subscribe(() => {
            alert("Question updated successfully!");
            this.resetForm();
          }, error => {
            console.error("Error updating question:", error);
            alert("Failed to update question.");
          });
  
      } else {
        // Creating a new question (uses FormData for file upload)
        const formData = new FormData();
        Object.keys(this.questionForm.value).forEach(key => {
          formData.append(key, this.questionForm.value[key]);
        });
  
        const teacherId = localStorage.getItem('teacherId') || '1';
        formData.append("created_by", teacherId);
  
        if (this.selectedFile) {
          formData.append("image", this.selectedFile);
        }
  
        this.http.post('http://localhost:5000/api/questions/create', formData)
          .subscribe(() => {
            alert("Question added successfully!");
            this.resetForm();
          }, error => {
            console.error("Error adding question:", error);
            alert("Failed to add question.");
          });
      }
    }
  }
  
  deleteQuestion(id: number) {
    if (confirm("Are you sure you want to delete this question?")) {
      this.http.delete(`http://localhost:5000/api/questions/${id}`).subscribe(() => {
        alert("Question deleted successfully!");
        this.loadQuestions();
      });
    }
  }

  editQuestion(question: any) {
    this.showCreateForm = true;  // Show the form for editing
    this.showQuestionBank = false; // Hide question bank when editing
    this.showTestSubmissions = false;
  
    // Populate the form with the selected question's details
    this.questionForm.patchValue({
      question_text: question.question_text,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      option_d: question.option_d,
      correct_option: question.correct_option
    });
  
    // If the question has an image, show it in preview
    this.previewImage = question.image_url ? `http://localhost:5000${question.image_url}` : null;
  
    // Store the question ID to update on form submission
    this.questionForm.setControl('id', this.fb.control(question.id));
  }
  
  resetForm() {
    this.questionForm.reset({
      correct_option: 'A'
    });
    this.previewImage = null;
    this.selectedFile = null;
    this.showCreateForm = false;
    this.loadQuestions();
  }

  monitorTests() {
    this.http.get<any[]>('http://localhost:5000/api/questions/test-submissions').subscribe(
      (data) => {
        this.testSubmissions = data;
        this.showTestSubmissions = true;
        this.showCreateForm = false;
        this.showQuestionBank = false;
      },
      (error) => {
        console.error("Error fetching test submissions:", error);
        alert("Failed to load test submissions.");
      }
    );
  }

  goBack() {
    this.showTestSubmissions = false;
    this.showQuestionBank = false;
    this.showCreateForm = false;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  formatTimeTaken(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
}