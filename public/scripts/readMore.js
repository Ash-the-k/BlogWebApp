document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.blog-content').forEach(content => {
    const btn = content.nextElementSibling;
    
    // Check if content needs "Read More" by comparing scrollHeight with clientHeight
    if (content.scrollHeight > content.clientHeight) {
      btn.style.display = 'inline-block';
    }
    
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      
      if (content.classList.contains('truncated')) {
        content.classList.remove('truncated');
        content.classList.add('expanded');
        this.textContent = 'Read Less';
        content.parentElement.closest('.glass-card').style.height = 'auto';
      } else {
        content.classList.remove('expanded');
        content.classList.add('truncated');
        this.textContent = 'Read More';
        content.parentElement.closest('.glass-card').style.height = '';
      }
    });
  });
});