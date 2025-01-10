class FilterManager {
  constructor() {
    this.currentFilter = 'all';
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.filterContainer = document.querySelector('.filter-container');
    this.liveRegion = this.createLiveRegion();
    
    this.init();
  }

  createLiveRegion() {
    const region = document.createElement('div');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('class', 'sr-only');
    document.body.appendChild(region);
    return region;
  }

  init() {
    this.addFilterListeners();
    this.addKeyboardNavigation();
  }

  addFilterListeners() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => this.handleFilterChange(button));
    });
  }

  addKeyboardNavigation() {
    this.filterButtons.forEach((button, index) => {
      button.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            this.handleFilterChange(button);
            break;
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            const nextIndex = (index + 1) % this.filterButtons.length;
            this.filterButtons[nextIndex].focus();
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            const prevIndex = (index - 1 + this.filterButtons.length) % this.filterButtons.length;
            this.filterButtons[prevIndex].focus();
            break;
          case 'Home':
            e.preventDefault();
            this.filterButtons[0].focus();
            break;
          case 'End':
            e.preventDefault();
            this.filterButtons[this.filterButtons.length - 1].focus();
            break;
        }
      });
    });
  }

  handleFilterChange(selectedButton) {
    const newFilter = selectedButton.getAttribute('data-filter');
    if (this.currentFilter === newFilter) return;

    this.currentFilter = newFilter;
    this.updateButtonStates(selectedButton);
    this.filterProjects();
    this.announceFilterChange(selectedButton.textContent);
  }

  updateButtonStates(selectedButton) {
    this.filterButtons.forEach(button => {
      const isSelected = button === selectedButton;
      button.setAttribute('aria-pressed', isSelected.toString());
      button.classList.remove('bg-blue-600', 'text-white', 'bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
      
      if (isSelected) {
        button.classList.add('bg-blue-600', 'text-white');
      } else {
        button.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
      }
    });
  }

  filterProjects() {
    this.projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags')?.split(',') || [];
      const shouldShow = this.currentFilter === 'all' || tags.includes(this.currentFilter);
      
      if (shouldShow) {
        this.showProject(card);
      } else {
        this.hideProject(card);
      }
    });
  }

  showProject(card) {
    card.style.display = 'block';
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }

  hideProject(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.display = 'none';
    }, 300);
  }

  announceFilterChange(filterName) {
    const visibleProjects = Array.from(this.projectCards).filter(
      card => card.style.display !== 'none'
    ).length;
    
    this.liveRegion.textContent = `Filtro alterado para ${filterName}. ${visibleProjects} projetos encontrados.`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FilterManager();
});