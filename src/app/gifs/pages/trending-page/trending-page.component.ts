import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
})

export default class TrendingPageComponent implements AfterViewInit {

  gifService = inject(GifService)
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit() {

    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) {
      return
    }

    console.log("scrollDiv.scrollTop BEFORE", scrollDiv.scrollTop)

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()

    console.log("scrollDiv.scrollTop AFTER",scrollDiv.scrollTop)

  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) {
      return
    }

    const scrollTop = scrollDiv.scrollTop
    const clientHeight = scrollDiv.clientHeight
    const scrollHeight = scrollDiv.scrollHeight

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight

    if (isAtBottom) {
      this.gifService.loadTrendingGifs()
    }

    this.scrollStateService.trendingScrollState.set(scrollTop)
  }
}
