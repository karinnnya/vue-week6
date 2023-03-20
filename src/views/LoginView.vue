<template>
    <h2>後台登入畫面</h2>
    <div class="card p-5 m-5">
        <form id="form" class="form-signin">
            <div class="form-floating mb-3">
                <input v-model="user.username" type="email" class="form-control" id="username"
                    placeholder="name@example.com" required autofocus>
                <label for="username">Email address</label>
            </div>
            <div class="form-floating">
                <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password"
                    required>
                <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="login">
                登入
            </button>
        </form>
    </div>
</template>

<script>

import Swal from "sweetalert2";
const { VITE_APP_URL } = import.meta.env

export default {

    data() {
        return {
            user: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {

            this.$http.post(`${VITE_APP_URL}/admin/signin`, this.user)
                .then((res) => {
                    const { token, expired } = res.data;

                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}, 31 Dec 9999 23:59:59 GMT; `;
                    this.$router.push('/admin/products')
                })
                .catch((error) => {
                    Swal.fire({
                        title: '帳戶密碼錯誤，請重新確認',
                        icon: 'error',
                        html: '',
                        confirmButtonText: '我知道了',
                        confirmButtonAriaLabel: '我知道了',

                        // 自訂按鈕 class
                        customClass: {
                            confirmButton: 'btn btn-outline-info',
                        },
                        buttonsStyling: false,

                    });
                })
        }
    }

}


</script>