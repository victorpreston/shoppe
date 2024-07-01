import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavbarComponent,FormsModule,CommonModule]
})
export class HomeComponent implements OnInit {
  images: string[] = [
  
       
       'https://iteystore.co.ke/cdn/shop/files/Untitleddesign84_02f5b94c-cefd-4a9a-bffa-e4d6e2ce13dc_1066x.png?v=1705580018',
       'https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp-x/phones/kv/pura70-ultra-kv.jpg',
       'https://www.wareable.com/wp-content/uploads/sites/6/2024/migration-5/86-apple-watch-wearable-technology-features-10-best-smartwatches-for-iphone-and-apple-watch-alternatives-non-imported-image3-kb8yagds0x-1024x576.jpg'
    ];
  currentImageIndex = 0;
  timer: string='';
  targetTime!: Date;

  ngOnInit() {
    setInterval(() => {
      this.rotateBackgroundImage();
    }, 5000);

    this.targetTime = new Date(Date.now() + 3600 * 1000);
    this.updateCountdown();
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  rotateBackgroundImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
  updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = this.targetTime.getTime() - now;

    if (timeLeft > 0) {
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      this.timer = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      this.timer = '00:00:00';
    }
  }
}