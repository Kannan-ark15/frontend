import { inject, Injectable } from "@angular/core";
import { ProfileService } from "../profile-page/profile-service";

export interface VideoProject {
  user:string;
  title:string;
  description:string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {
    porfileService=inject(ProfileService);
    vidoeProjects: VideoProject[] = [
    {
        user:'recruiter',
        title:'About Me',
        description:'Where Creativity Meets Coding',
        videoUrl: 'assets/videos/About_Recruiter.mp4'
    },
    {
        user:'developer',
        title:'About Me',
        description:'Where Creativity Meets Coding',
        videoUrl: 'assets/videos/About_Developer.mp4'
    },
    {
        user:'anonymus',
        title:'Hi There',
        description:'Tell me your name, time to write it down.',
        videoUrl: 'assets/videos/About_Stalker.mp4'
    },
    ];

    getvideoUrlForProfile(profileName: string):any{
        const project = this.vidoeProjects.find(p => p.user === profileName);
        return project ?project:[];
    }

}