document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact__form');
    const nameInput = document.querySelector('#_name');
    const companyInput = document.querySelector('#company');
    const emailInput = document.querySelector('#email');
    const telInput = document.querySelector('#tel');
    const messageInput = document.querySelector('#message');
    const privacyCheckbox = document.querySelector('#privacy');
    let scrollPosition = 0; // スクロール位置を保持する変数を追加

    // エラーメッセージを表示する関数
    function showError(input, message) {
        const formGroup = input.closest('.contact__form-group');
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        input.classList.add('error');
    }

    // エラーメッセージをクリアする関数
    function clearError(input) {
        const formGroup = input.closest('.contact__form-group');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('error');
    }

    // バリデーション関数
    function validateForm() {
        let isValid = true;

        // 名前のバリデーション
        if (!nameInput.value.trim()) {
            showError(nameInput, 'お名前を入力してください');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // 会社名
        if (!companyInput.value.trim()) {
            showError(companyInput, '会社名を入力してください');
            isValid = false;
        } else {
            clearError(companyInput);
        }

        // メールアドレスのバリデーション
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'メールアドレスを入力してください');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, '有効なメールアドレスを入力してください');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // 電話番号のバリデーション（任意）
        if (telInput && telInput.value.trim()) {
            const telRegex = /^[0-9-]{10,13}$/;
            if (!telRegex.test(telInput.value)) {
                showError(telInput, '有効な電話番号を入力してください');
                isValid = false;
            } else {
                clearError(telInput);
            }
        }

        // お問い合わせ内容のバリデーション
        if (!messageInput.value.trim()) {
            showError(messageInput, 'お問い合わせ内容を入力してください');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        // プライバシーポリシーの同意確認
        if (!privacyCheckbox.checked) {
            showError(privacyCheckbox, 'プライバシーポリシーに同意してください');
            isValid = false;
        } else {
            clearError(privacyCheckbox);
        }

        const targetElement = document.getElementById("contact");

        if (targetElement) {
            console.log("aaa");
            targetElement.scrollIntoView({
                behavior: "smooth"
            });
        }

        return isValid;
    }

    // モーダルのHTML要素を作成
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">送信完了</h3>
                <button class="modal__close">&times;</button>
            </div>
            <div class="modal__body">
                <p class="modal__message">お問い合わせありがとうございます。<br>内容を確認次第、担当者よりご連絡させていただきます。</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // モーダルを表示する関数
    function showModal() {
        scrollPosition = window.OffsetHeight; // 現在のスクロール位置を保存
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        document.body.style.top = `-${scrollPosition}px`; // スクロール位置を固定
    }

    // モーダルを閉じる関数
    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.top = ''; // スクロール位置の固定を解除
        window.scrollTo(0, scrollPosition); // 保存していたスクロール位置に戻る
    }

    // モーダルを閉じるイベントリスナー
    modal.querySelector('.modal__close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // フォーム送信時の処理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // フォーム送信の処理
            // javascriptは書き換えが可能なため、サーバー側でもチェックを行います。
            // console.log('フォームが送信されました');
            // showModal();
            // form.reset();

            form.submit();
        }
    });

    // メール送信完了後にモーダル表示
    if(document.getElementById("success_message").value == "on"){
        showModal();
    }

    // 入力フィールドの変更時にエラーをクリア
    const inputs = [nameInput, companyInput, emailInput, messageInput];
    if (telInput) inputs.push(telInput);

    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                clearError(this);
            });
        }
    });

    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', function() {
            clearError(this);
        });
    }
});
