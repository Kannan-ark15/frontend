import { inject, Injectable } from "@angular/core";
import { ProfileService } from "../profile-page/profile-service";

export interface VideoProject {
  user:string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {
    porfileService=inject(ProfileService);
    vidoeProjects: VideoProject[] = [
    {
        user:'Recruiter',
        videoUrl: 'assets/videos/About_Recruiter.mp4'
    },
    {
        user:'Developer',
        videoUrl: 'assets/videos/About_Developer.mp4'
    },
    {
        user:'Stalker',
      videoUrl: 'https://assets.mixkit.co/videos/preview'
    },
    ];

    getvideoUrlForProfile(profileName: string): string {
        const project = this.vidoeProjects.find(p => p.user === profileName);
        return project ? project.videoUrl : 'assets/videos/default-hero.mp4';
    }
}