import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from "lucide-angular";
import { Router } from '@angular/router';
import { ProfileService } from '../profile-page/profile-service';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';

interface Question {
  q: string;
  a: string;
  hint: string;
}

interface Movie {
  title: string;
  poster: string;
  questions: {
    javascript: Question[];
    java: Question[];
  };
}
@Component({
  selector: 'app-game',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule,AppNavbarComponent],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  movies: Movie[] = [
    {
      title: 'THE BATMAN 2022',
      poster: 'assets/images/batman.webp',
      questions: {
        javascript: [
          { q: 'let x = 84; console.log(String.fromCharCode(x))', a: 'T', hint: 'ASCII code 84' },
          {
            q: 'const arr = [72,69,76]; console.log(String.fromCharCode(arr[0]))',
            a: 'H',
            hint: 'First element ASCII',
          },
          {
            q: 'let hex = 0x45; console.log(String.fromCharCode(hex))',
            a: 'E',
            hint: 'Hexadecimal 0x45',
          },
          {
            q: 'let binary = 0b1000010; console.log(String.fromCharCode(binary))',
            a: 'B',
            hint: 'Binary to char',
          },
          {
            q: "const obj = {name: 'ALPHA'}; console.log(obj.name[0])",
            a: 'A',
            hint: 'Object property first char',
          },
          { q: 'let x = 84; console.log(String.fromCharCode(x))', a: 'T', hint: 'ASCII 84' },
          {
            q: "const map = new Map([['key','MAN']]); console.log(map.get('key')[0])",
            a: 'M',
            hint: 'Map value first char',
          },
          {
            q: "const obj = {val: 'ALPHA'}; console.log(obj.val[0])",
            a: 'A',
            hint: 'Object property access',
          },
          {
            q: 'let arr = [78,73]; console.log(String.fromCharCode(arr[0]))',
            a: 'N',
            hint: 'ASCII 78',
          },
          {
            q: 'let hex = 0x32; console.log(String.fromCharCode(hex))',
            a: '2',
            hint: 'Hex 0x32 is ASCII 50',
          },
          { q: "console.log('2022'.charAt(1))", a: '0', hint: 'Second character of string' },
          { q: 'let x = 50; console.log(String.fromCharCode(x))', a: '2', hint: 'ASCII 50' },
          {
            q: 'let binary = 0b110010; console.log(String.fromCharCode(binary))',
            a: '2',
            hint: 'Binary 50',
          },
        ],
        java: [
          { q: 'int x = 84; System.out.println((char)x);', a: 'T', hint: 'Cast int to char' },
          {
            q: 'int[] arr = {72,69}; System.out.println((char)arr[0]);',
            a: 'H',
            hint: 'Array first element',
          },
          { q: 'char c = 69; System.out.println(c);', a: 'E', hint: 'Character literal' },
          { q: 'System.out.println((char)(66));', a: 'B', hint: 'Direct casting to B' },
          {
            q: 'String s = "ALPHA"; System.out.println(s.charAt(0));',
            a: 'A',
            hint: 'charAt method',
          },
          { q: 'int ascii = 84; System.out.println((char)ascii);', a: 'T', hint: 'ASCII to char' },
          { q: 'System.out.println((char)(77));', a: 'M', hint: 'ASCII 77 is M' },
          { q: 'char c = 65; System.out.println(c);', a: 'A', hint: 'Char literal 65' },
          { q: 'int x = 78; System.out.println((char)x);', a: 'N', hint: 'Cast 78 to char' },
          { q: 'System.out.println((char)(50));', a: '2', hint: 'ASCII 50 is digit 2' },
          {
            q: 'String s = "2022"; System.out.println(s.charAt(1));',
            a: '0',
            hint: 'Second character',
          },
          { q: 'char c = 50; System.out.println(c);', a: '2', hint: 'Char literal 50' },
          { q: 'int ascii = 50; System.out.println((char)ascii);', a: '2', hint: 'ASCII 50' },
        ],
      },
    },
    {
      title: 'SALAAR',
      poster: 'assets/images/salaar.jpeg',
      questions: {
        javascript: [
          { q: 'let x = 83; console.log(String.fromCharCode(x))', a: 'S', hint: 'ASCII 83' },
          {
            q: "const obj = {name: 'ALPHA'}; console.log(obj.name[0])",
            a: 'A',
            hint: 'First character',
          },
          {
            q: 'let arr = [76, 77, 78]; console.log(String.fromCharCode(arr[0]))',
            a: 'L',
            hint: 'Array first',
          },
          { q: "console.log('AREA'.slice(0,1))", a: 'A', hint: 'String slice' },
          {
            q: "const map = new Map([['x','AR']]); console.log(map.get('x')[0])",
            a: 'A',
            hint: 'Map value first char',
          },
          {
            q: 'let binary = 0b1010010; console.log(String.fromCharCode(binary))',
            a: 'R',
            hint: 'Binary to char',
          },
        ],
        java: [
          { q: 'int ascii = 83; System.out.println((char)ascii);', a: 'S', hint: 'Cast to char' },
          {
            q: 'String s = "ALPHA"; System.out.println(s.charAt(0));',
            a: 'A',
            hint: 'charAt method',
          },
          {
            q: 'int[] arr = {76,77}; System.out.println((char)arr[0]);',
            a: 'L',
            hint: 'Array and casting',
          },
          {
            q: 'String s = "AREA"; System.out.println(s.substring(0,1));',
            a: 'A',
            hint: 'Substring',
          },
          { q: 'char c = 65; System.out.println(c);', a: 'A', hint: 'Char literal' },
          { q: 'System.out.println((char)(82));', a: 'R', hint: 'Direct char cast' },
        ],
      },
    },
    {
      title: 'JERSEY',
      poster: 'assets/images/jersey.webp',
      questions: {
        javascript: [
          {
            q: 'let hex = 0x4A; console.log(String.fromCharCode(hex))',
            a: 'J',
            hint: 'Hex to ASCII',
          },
          {
            q: 'const arr = [69,70,71]; console.log(String.fromCharCode(arr[0]))',
            a: 'E',
            hint: 'Array to char',
          },
          {
            q: 'let n = 82; console.log(String.fromCharCode(n))',
            a: 'R',
            hint: 'ASCII conversion',
          },
          { q: "console.log('SEARCH'.match(/^S/)[0])", a: 'S', hint: 'Regex match' },
          {
            q: 'const set = new Set([69,69,69]); console.log(String.fromCharCode([...set][0]))',
            a: 'E',
            hint: 'Set uniqueness',
          },
          {
            q: 'let binary = 0b1011001; console.log(String.fromCharCode(binary))',
            a: 'Y',
            hint: 'Binary to char',
          },
        ],
        java: [
          { q: 'int x = 74; System.out.println((char)x);', a: 'J', hint: 'Int to char' },
          {
            q: "char[] arr = {'E','F'}; System.out.println(arr[0]);",
            a: 'E',
            hint: 'Char array access',
          },
          { q: 'System.out.println((char)(82));', a: 'R', hint: 'Character casting' },
          {
            q: 'String s = "SEARCH"; System.out.println(s.charAt(0));',
            a: 'S',
            hint: 'First character',
          },
          {
            q: 'int ascii = 69; System.out.println(Character.toString(ascii));',
            a: 'E',
            hint: 'Character toString',
          },
          { q: 'char c = 89; System.out.println(c);', a: 'Y', hint: 'Char literal' },
        ],
      },
    },
  ];

  selectedMovie: Movie | null = null;
  language: 'javascript' | 'java' | null = null;
  currentQuestion = 0;
  userAnswerControl = new FormControl('');
  
 

  correctAnswers = 0;
  feedback: 'correct' | 'wrong' | null = null;
  gameComplete = false;
  shake = false;
  showHint = false;
  profile=''
  menuItems:any[]=[]
  router=inject(Router)
  profileService=inject(ProfileService)
    ngOnInit(){
     const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|anonymus)\//);
    
    if (profileMatch) {
      this.profile = profileMatch[1];
      this.profileService.setProfile(this.profile);
    } else {
      this.profile = 'recruiter';
      this.profileService.setProfile(this.profile);
    }

    // Now set menu items with the correct profile
    this.menuItems = [
      { label: 'Home', route: `/${this.profile}/home` },
      { label: 'Skills', route: `/${this.profile}/skills`,section:'Skills' },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

  }
  selectRandomMovie() {
    const random = this.movies[Math.floor(Math.random() * this.movies.length)];
    this.selectedMovie = random;
  }

  selectMovie(index: number) {
    this.selectedMovie = this.movies[index];
  }

  selectLanguage(lang: 'javascript' | 'java') {
    this.language = lang;
  }

  calculateOpacity(): number {
    if (!this.selectedMovie || !this.language) return 0;
    const total = this.selectedMovie.questions[this.language].length;
    const progress = this.correctAnswers / total;

    if (progress === 0) return 0;
    if (progress < 0.2) return 0.06;
    if (progress < 0.4) return 0.07;
    if (progress < 0.6) return 0.08;
    if (progress < 0.8) return 0.1;
    if (progress <1) return 0.3;
    return 1;
  }

    
  handleSubmit() {
    const answer = this.userAnswerControl.value?.trim() || '';
    console.log('Answer:', answer);
    if (!this.userAnswer.trim() || !this.selectedMovie || !this.language) return;

    const currentQ = this.selectedMovie.questions[this.language][this.currentQuestion];
    const isCorrect = this.userAnswer.trim().toUpperCase() === currentQ.a.toUpperCase();

    if (isCorrect) {
      this.feedback = 'correct';
      this.correctAnswers++;
      this.showHint = false;

      setTimeout(() => {
        if (this.currentQuestion < this.selectedMovie!.questions[this.language!].length - 1) {
          this.currentQuestion++;
          this.feedback = null;
          this.userAnswerControl.setValue('');
        } else {
          this.gameComplete = true;
        }
      }, 1000);
    } else {
      this.feedback = 'wrong';
      this.shake = true;
      setTimeout(() => {
        this.shake = false;
        this.feedback = null;
      }, 500);
    }
  }

   get userAnswer(): string {
    return this.userAnswerControl.value || '';
  } 
  resetGame() {
    this.selectedMovie = null;
    this.language = null;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.feedback = null;
    this.gameComplete = false;
    this.showHint = false;
    this.userAnswerControl.setValue('');
  }

  get progress(): string {
    if (!this.selectedMovie || !this.language) return '0';
    const total = this.selectedMovie.questions[this.language].length;
    return ((this.correctAnswers / total) * 100).toFixed(0);
  }

  get currentQ(): Question | null {
    if (!this.selectedMovie || !this.language) return null;
    return this.selectedMovie.questions[this.language][this.currentQuestion];
  }

  get totalQuestions(): number {
    if (!this.selectedMovie || !this.language) return 0;
    return this.selectedMovie.questions[this.language].length;
  }
}
