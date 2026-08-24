const pageImages = document.querySelectorAll('img:not(.lightbox-image)');

const googleScriptUrl =
	'https://script.google.com/macros/s/AKfycbzxcXoh5eJW-UeVD0-ADmMR0crrZyW0Maq_slp5y1gTI5bSvDgQ5J8ZQLf8RTRi0E_9/exec';

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm && formStatus) {

	contactForm.addEventListener('submit', async (event) => {

		event.preventDefault();

		const submitButton =
			contactForm.querySelector('button[type="submit"]');

		const formData = new FormData(contactForm);

		submitButton.disabled = true;

		formStatus.textContent = 'Đang gửi thông tin...';
		formStatus.className = 'form-status is-loading';

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 15000);

			await fetch(googleScriptUrl, {
				method: 'POST',
				mode: 'no-cors',
				signal: controller.signal,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				body: new URLSearchParams(formData).toString()
			});
			clearTimeout(timeoutId);

			contactForm.reset();

			formStatus.textContent =
				'Đã gửi thông tin. Chúng tôi sẽ liên hệ với bạn sớm.';

			formStatus.className =
				'form-status is-success';

		} catch (error) {

			console.error('Lỗi gửi form:', error);
			const errorMessage = error.name === 'AbortError'
				? 'Kết nối quá thời gian (15 giây). Vui lòng kiểm tra mạng và thử lại.'
				: `Lỗi kết nối: ${error.message || 'Không xác định'}.`;

			formStatus.textContent = `${errorMessage} Nếu vẫn lỗi, kiểm tra quyền Web App là “Bất cứ ai”.`;

			formStatus.className =
				'form-status is-error';

		} finally {

			submitButton.disabled = false;

		}
	});
}