// Description with show more/less functionality
function updateDescription(description, showMoreText, showLessText) {
    if (!dom.descriptionShortElement || !dom.descriptionFullElement || !dom.showMoreBtn) {
        console.error('Description elements not found');
        return;
    }
    
    const MAX_LENGTH = 300;
    
    // Handle empty description
    if (!description || description.trim() === '') {
        dom.descriptionShortElement.textContent = '';
        dom.descriptionShortElement.style.display = 'none';
        dom.descriptionFullElement.innerHTML = '';
        dom.descriptionFullElement.classList.remove('expanded');
        dom.showMoreBtn.style.display = 'none';
        return;
    }
    
    // Strip HTML tags to count characters
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    console.log('Description length:', textContent.length, 'characters');
    
    // Always set full description
    dom.descriptionFullElement.innerHTML = description;
    dom.descriptionFullElement.classList.remove('expanded');
    dom.descriptionFullElement.style.display = 'none'; // Hide initially
    
    if (textContent.length > MAX_LENGTH) {
        // Hide short description completely
        dom.descriptionShortElement.textContent = '';
        dom.descriptionShortElement.style.display = 'none';
        
        // Show "Show more" button
        dom.showMoreBtn.style.display = 'block';
        dom.showMoreBtn.textContent = showMoreText;
        dom.showMoreBtn.onclick = function() {
            if (dom.descriptionFullElement.classList.contains('expanded')) {
                // Collapse - hide description
                dom.descriptionFullElement.classList.remove('expanded');
                dom.descriptionFullElement.style.display = 'none';
                dom.showMoreBtn.textContent = showMoreText;
            } else {
                // Expand - show full description
                dom.descriptionFullElement.classList.add('expanded');
                dom.descriptionFullElement.style.display = 'block';
                dom.showMoreBtn.textContent = showLessText;
            }
        };
    } else {
        // Description is short enough, but still hide initially
        dom.descriptionShortElement.textContent = '';
        dom.descriptionShortElement.style.display = 'none';
        dom.descriptionFullElement.innerHTML = description;
        // Only show if description is short (less than 300 chars)
        if (textContent.length > 0) {
            dom.showMoreBtn.style.display = 'block';
            dom.showMoreBtn.textContent = showMoreText;
            dom.showMoreBtn.onclick = function() {
                if (dom.descriptionFullElement.classList.contains('expanded')) {
                    dom.descriptionFullElement.classList.remove('expanded');
                    dom.descriptionFullElement.style.display = 'none';
                    dom.showMoreBtn.textContent = showMoreText;
                } else {
                    dom.descriptionFullElement.classList.add('expanded');
                    dom.descriptionFullElement.style.display = 'block';
                    dom.showMoreBtn.textContent = showLessText;
                }
            };
        } else {
            dom.showMoreBtn.style.display = 'none';
        }
    }
}

