// Image slider functionality
let currentImageIndex = 0;
let currentImages = [];

function updateImageSlider(images) {
    if (!dom.sliderWrapper || !dom.sliderDots) return;
    
    // Store current images array
    currentImages = images;
    
    dom.sliderWrapper.innerHTML = '';
    dom.sliderDots.innerHTML = '';

    if (images.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.style.width = '100%';
        placeholder.style.height = '100%';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = '#888';
        placeholder.textContent = 'No images available';
        dom.sliderWrapper.appendChild(placeholder);
        return;
    }

    images.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Image ${index + 1}`;
        img.className = 'slider-image';
        img.onerror = function() {
            this.style.display = 'none';
        };
        dom.sliderWrapper.appendChild(img);

        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToImage(index));
        dom.sliderDots.appendChild(dot);
    });

    currentImageIndex = 0;
    updateSliderPosition();
    // Auto-slide disabled - only manual navigation
}

function updateSliderPosition() {
    if (!dom.sliderWrapper) return;
    
    const offset = -currentImageIndex * 100;
    dom.sliderWrapper.style.transform = `translateX(${offset}%)`;

    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

function goToImage(index) {
    if (index >= 0 && index < currentImages.length) {
        currentImageIndex = index;
        updateSliderPosition();
    }
}

function nextImage() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateSliderPosition();
}

function prevImage() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateSliderPosition();
}

// Auto-slide functionality removed - slider only responds to user interaction

// Initialize slider navigation
if (dom.sliderNext && dom.sliderPrev) {
    dom.sliderNext.addEventListener('click', nextImage);
    dom.sliderPrev.addEventListener('click', prevImage);
}

