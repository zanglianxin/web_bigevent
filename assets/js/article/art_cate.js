$(function () {
    const initArtCateList = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章分类列表失败');
                const htmlStr = template('tpl-table', res)
                $('tbody').empty().html(htmlStr)
            }
        })
    }

    initArtCateList()

    let form = layui.form
    let indexAdd = null
    $('#btnAddCate').click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('添加文章分类失败');
                layer.msg('添加文章分类成功')
                layer.close(indexAdd)
                initArtCateList()
            }
        })
    })

    let indexEdit = null
    $('body').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        })

        const id = $(this).attr('data-id')
        $.ajax({
            type: 'GET',
            url: `/my/article/cates/${id}`,
            success: (res) => {
                form.val("form-edit", res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('修改文章分类失败');
                layer.msg('修改文章分类成功')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    $('body').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id')
        layer.confirm("确定删除吗？", {
            icon: 3,
            title: "提示"
        }, function (index) {
            $.ajax({
                type: 'GET',
                url: `/my/article/deletecate/${id}`,
                success: (res) => {
                    if (res.status !== 0) return layer.msg('删除文章分类失败');
                    layer.msg('删除文章分类成功')
                    initArtCateList()
                    layer.close(index)
                }
            })
        })
    })
})