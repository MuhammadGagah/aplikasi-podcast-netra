import { Component, OnInit } from '@angular/core';
import { RssService } from '../services/rss.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface RssItem {
  title: string;
  description: string;
  link?: string;
}

@Component({
  selector: 'app-dengar',
  templateUrl: './dengar.page.html',
  styleUrls: ['./dengar.page.scss'],
})
export class DengarPage implements OnInit {
  rssData: RssItem[] = [];

  constructor(
    private rssService: RssService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadRssFeed('https://anchor.fm/s/1290b87c/podcast/rss');
  }

  loadRssFeed(url: string) {
    this.rssService.getRssFeed(url).subscribe(
      (data) => {
        this.rssData = this.parseXml(data);
      },
      (error) => {
        console.error('Error fetching RSS feed:', error);
      }
    );
  }

  parseXml(data: string): RssItem[] {
    const items: RssItem[] = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    const itemNodes = xmlDoc.querySelectorAll('item');

    itemNodes.forEach((itemNode) => {
      const titleNode = itemNode.querySelector('title');
      const descriptionNode = itemNode.querySelector('description');
      const linkNode = itemNode.querySelector('link');

      if (titleNode && descriptionNode) {
        const item: RssItem = {
          title: titleNode.textContent || '',
          description: descriptionNode.textContent || '',
          link: linkNode?.textContent || undefined,
        };

        items.push(item);
      }
    });

    return items;
  }

  // Method to play the podcast by redirecting to the provided link
  playPodcast(link: string | undefined) {
    if (link) {
      window.location.href = link;
    }
  }
}
