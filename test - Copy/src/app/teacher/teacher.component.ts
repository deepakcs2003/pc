import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teacher.component.html',
})
export class TeacherComponent implements OnInit {
  availableTests: any[] = [];
  newTestTitle: string = '';
  newQuestions: any[] = [
    { question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: '' }
  ];
  selectedTest: any = null; // Add this for test selection

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAvailableTests();
  }

  // Load all available tests
  loadAvailableTests() {
    this.authService.getAvailableTests().subscribe({
      next: (data) => this.availableTests = data,
      error: (err) => console.error('Failed to load available tests', err)
    });
  }

  // Add a new question to the test creation form
  addQuestion() {
    this.newQuestions.push({ question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: '' });
  }

  // Create a new test
  createTest() {
    if (!this.newTestTitle || this.newQuestions.length === 0) {
      alert('Please enter test title and at least one question');
      return;
    }

    const testData = {
      title: this.newTestTitle,
      questions: this.newQuestions
    };

    this.authService.createTest(testData).subscribe({
      next: () => {
        alert('Test created');
        this.newTestTitle = '';
        this.newQuestions = [{ question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: '' }];
        this.loadAvailableTests();
      },
      error: (err) => console.error('Failed to create test', err)
    });
  }

  // Define selectTest method for selecting a test
  selectTest(test: any) {
    this.selectedTest = test; // Store the selected test
    console.log('Selected test:', test); // You can do further actions with the selected test if needed
  }
}
