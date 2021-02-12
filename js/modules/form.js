import {closeModal, openModal} from './modal';
import {postData} from './serveses';

function form(formSelector, modalTimerId) {
      //Form

      const forms = document.querySelectorAll(formSelector);

      const message = {
          loading: 'img/form/spinner.svg',
          success: 'Спасибо',
          failure: 'Что то пошло не так...'
      };
  
      forms.forEach(item => {
          bindPostData(item);
      });
  
      function bindPostData(form) {
          form.addEventListener('submit', (event) => {
              event.preventDefault();
  
              let statusMessage = document.createElement('img');
              statusMessage.src = message.loading;
              statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;
           `;
              form.append(statusMessage);
              form.insertAdjacentElement('afterend', statusMessage);
  
              const formData = new FormData(form);
  
              const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
              postData('http://localhost:3000/requests', json)
                  .then(data => {
                      console.log(data);
                      showThanksModal(message.success);
                      statusMessage.remove();
  
                  })
                  .catch(() => {
                      showThanksModal(message.failure);
                  })
                  .finally(() => {
                      form.reset();
                  });
          });
      }
  
  
      function showThanksModal(message) {
          const prevModalDialog = document.querySelector('.modal__dialog');
  
          prevModalDialog.classList.add('hide');
          openModal('.modal', modalTimerId);
  
          const thanksModal = document.createElement('div');
          thanksModal.classList.add('modal__dialog');
          thanksModal.innerHTML = `
           <div class="modal__content">
              <div data-close class="modal__close">×</div>
              <div class="modal__title">${message}</div>
           </div>
        `;
  
          document.querySelector('.modal').append(thanksModal);
          setTimeout(() => {
              thanksModal.remove();
              prevModalDialog.classList.add('show');
              prevModalDialog.classList.add('hide');
              closeModal('.modal');
          }, 4000);
      }  
}

export default form;
