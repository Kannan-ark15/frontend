// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { 
  LucideAngularModule, 
  Sunrise,      // 5:00 AM - Wake up
  Dumbbell,     // 6:00 AM - Gym
  Coffee,       // 10:00 AM - Coffee + Code
  UtensilsCrossed, // 12:00 PM - Lunch
  Bug,          // 2:00 PM - Debugging
  Soup,         // 5:00 PM - Tea break
  Film,         // 7:00 PM - Movie
  CookingPot,   // 8:00 PM - Dinner
  Moon ,
  Search,
  Calendar,         // 10:00 PM - Sleep
  AlarmClock,
  Theater,
  Dice1
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withInMemoryScrolling({
        scrollPositionRestoration: 'top', // Always scroll to top on navigation
        anchorScrolling: 'enabled' // Enable fragment/anchor scrolling
      }),),

    importProvidersFrom(
      LucideAngularModule.pick({
        Sunrise,
        Dumbbell,
        Coffee,
        UtensilsCrossed,
        Bug,
        Soup,
        Film,
        CookingPot,
        Moon,
        Search,
        Calendar,
        AlarmClock,
         Theater,
        Dice1
      })
    )
  ],
};
