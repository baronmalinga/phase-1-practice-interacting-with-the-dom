document.addEventListener('DOMContentLoaded', () => {
    let counter = document.getElementById('counter');
    let minus = document.getElementById('minus');
    let plus = document.getElementById('plus');
    let heart = document.getElementById('heart');
    let pause = document.getElementById('pause');
    let likes = document.querySelector('.likes');
    let commentForm = document.getElementById('comment-form');
    let commentInput = document.getElementById('comment-input');
    let commentsList = document.getElementById('list');
  
    let count = 0;
    let paused = false;
    let likeCounts = {};
  
    function updateCounter() {
      counter.textContent = count;
    }
  
    function toggleButtons(state) {
      minus.disabled = state;
      plus.disabled = state;
      heart.disabled = state;
    }
  
    plus.addEventListener('click', () => {
      if (!paused) {
        count++;
        updateCounter();
      }
    });
  
    minus.addEventListener('click', () => {
      if (!paused) {
        count--;
        updateCounter();
      }
    });
  
    heart.addEventListener('click', () => {
      if (!paused) {
        if (!likeCounts[count]) {
          likeCounts[count] = 0;
        }
        likeCounts[count]++;
        let likeItem = document.querySelector(`li[data-num="${count}"]`);
        if (likeItem) {
          likeItem.textContent = `${count} has been liked ${likeCounts[count]} times`;
        } else {
          likeItem = document.createElement('li');
          likeItem.dataset.num = count;
          likeItem.textContent = `${count} has been liked ${likeCounts[count]} times`;
          likes.appendChild(likeItem);
        }
      }
    });
  
    pause.addEventListener('click', () => {
      paused = !paused;
      toggleButtons(paused);
      pause.textContent = paused ? 'resume' : 'pause';
    });
  
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let comment = commentInput.value;
      if (comment.trim() !== '') {
        let commentItem = document.createElement('p');
        commentItem.textContent = comment;
        commentsList.appendChild(commentItem);
        commentInput.value = '';
      }
    });
  
    // Initial state
    updateCounter();
    toggleButtons(false);
  });
  