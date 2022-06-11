// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((option) => {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    // console.log(option);
    option.url = `http://www.liulongbin.top:3007` + option.url;

    if (option.url.includes("/my/")) {
        option.headers = {
            Authorization: localStorage.getItem("token")
        }
    }

    option.complete = (res) => {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem("token")
            location.href = "/login.html"
        }
    }
});
