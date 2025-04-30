import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {
  availableTests: any[] = [];
  testResults: any[] = [];
  dashboardStats: any = {};
  selectedTest: any = null;
  selectedOption: string = '';
  currentQuestionIndex: number = 0;
  currentQuestion: any = null;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAvailableTests();
    this.loadDashboardStats();
    this.loadTestResults();
  }

  loadAvailableTests() {
    this.authService.getAvailableTests().subscribe({
      next: (data) => {
        this.availableTests = data;
      },
      error: (err) => {
        console.error('Failed to load available tests', err);
      }
    });
  }

  loadDashboardStats() {
    const studentId = localStorage.getItem('student_id') || '1';
    this.authService.getDashboardStats(studentId).subscribe({
      next: (data) => {
        this.dashboardStats = data;
      },
      error: (err) => {
        console.error('Failed to load dashboard stats', err);
      }
    });
  }

  loadTestResults() {
    const studentId = localStorage.getItem('student_id') || '1';
    this.authService.getTestResults(studentId).subscribe({
      next: (data) => {
        this.testResults = data;
      },
      error: (err) => {
        console.error('Failed to load test results', err);
      }
    });
  }

  selectTest(test: any) {
    this.selectedTest = test;
    this.currentQuestionIndex = 0;
    this.selectedOption = '';
    
    // Set the current question to the first question if available
    if (test.questions && test.questions.length > 0) {
      this.currentQuestion = test.questions[0];
    } else {
      this.currentQuestion = null;
    }
  }

  nextQuestion() {
    if (this.selectedTest && this.selectedTest.questions && 
        this.currentQuestionIndex < this.selectedTest.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.selectedTest.questions[this.currentQuestionIndex];
      this.selectedOption = '';
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.selectedTest.questions[this.currentQuestionIndex];
      this.selectedOption = '';
    }
  }

  submitTest() {
    if (!this.selectedTest || !this.selectedOption || !this.currentQuestion) {
      alert('Please select an option');
      return;
    }

    const submitData = {
      student_id: Number(localStorage.getItem('student_id') || '1'),
      test_id: Number(this.selectedTest.id),
      selected_option: this.selectedOption
    };

    this.authService.submitTest(submitData).subscribe({
      next: () => {
        if (this.currentQuestionIndex < this.selectedTest.questions.length - 1) {
          // Go to next question if not the last one
          this.nextQuestion();
        } else {
          // Finish test if it's the last question
          alert('Test submitted successfully');
          this.selectedTest = null;
          this.currentQuestion = null;
          this.selectedOption = '';
          this.loadDashboardStats();
          this.loadTestResults();
        }
      },
      error: (err) => {
        console.error('Failed to submit test', err);
      }
    });
  }

  cancelTest() {
    this.selectedTest = null;
    this.currentQuestion = null;
    this.selectedOption = '';
    this.currentQuestionIndex = 0;
  }
}