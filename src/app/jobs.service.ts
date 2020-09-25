import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const jobs = [
  {
    title: 'Sr. Software Developer',
    location: 'Gurgaon, India',
    date: '2020-07-20',
    id: 1
  },
  {
    title: 'Sr. Software Developer',
    location: 'London, UK',
    date: '2020-07-20',
    id: 2
  },
  {
    title: 'Testing Engineer',
    location: 'Gurgaon, India',
    date: '2020-07-20',
    id: 3
  },
  {
    title: 'Testing Engineer',
    location: 'London, UK',
    date: '2020-07-18',
    id: 4
  },
  {
    title: 'Sr. Web Designer',
    location: 'London, UK',
    date: '2020-07-20',
    id: 5
  },
  {
    title: 'Sr. Web Designer',
    location: 'Gurgaon, India',
    date: '2020-07-19',
    id: 6
  },
  {
    title: 'Sr. Front End Developer',
    location: 'London, UK',
    date: '2020-07-22',
    id: 7
  },
  {
    title: 'Sr. Front End Developer',
    location: 'Gurgaon, India',
    date: '2020-07-22',
    id: 8
  }
];

const fewerJobs = jobs.slice(0, 6);

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  getJobs() {
    if (Math.random() > 0.5) {
      return of(jobs);
    } else {
      return of(fewerJobs);
    }
  }

  getJob(jobId) {
    return of(jobs.find(({id}) => id===jobId));
  }

  applyToJob(id) {
    if (id===5) {
      return of({success: false});
    }
    return of({success: true});
  }

  constructor() { }
}
