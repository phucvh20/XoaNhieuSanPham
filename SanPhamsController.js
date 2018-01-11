var sanPhamsController = new Object();
// xóa 1 sản phẩm
sanPhamsController.deleteProduct = function () {

    //camel case function name javascript
    var deleteProduct = function () {
        // dang ky mot su kien cho thanh phan html
        // su dung thu vien jquery de lam viec
        // jquery la mot thu vien cua javascript, ho tro viet code ngan hon
        $(".js-delete-product").click(function (e) {
            var link = $(e.target);
            // debug : in ra hoac dung chuong trinh tai buoc nay de kiem tra ket qua
            //chu y : phai xoa khi len production
            //debugger;
            //console.log(link.attr("data-product-id"));
            var confirmDeleteProduct = confirm("Ban co chac xoa khong?");
            if (confirmDeleteProduct) {
                //Goi API xoa san pham
                $.ajax({
                    url: "/api/SanPhams/" + link.attr("data-product-id"),
                    type: "DELETE",
                    success: function () {
                        //tu dong thay doi bat dong bo DOM HTML

                        link.parents("tr").fadeOut(function () {
                            $(this).remove();
                        });
                    },
                    error: function () {
                        alert("xoa that bai");
                    }
                });
            }

        });
    }
    return {
        init: deleteProduct
    }
}();
//thêm 1 sản phẩm
sanPhamsController.addProduct = function () {
    var addProduct = function () {
        $("#formCreateNewProduct").submit(function (e) {
            e.preventDefault();
            //Bước 1: Lấy thông tin sản phẩm và đóng gói
            var sanPham = new Object();
            sanPham.TenSanPham = $("input[name='tenSanPham']").val();
            sanPham.GiaSanPham = $("input[name='giaSanPham']").val();
            //console.log(sanPham.TenSanPham);
            //Bước 2: Gởi API Post dữ liệu sản phẩm về Server
            $.post("/api/SanPhams", sanPham)
                //post thanh cong
                .done(function (maSanPham) {
                    alert("Thanh cong");
                    //insert 1 dong vao bang du lieu san pham
                    var actionLink = "<a href='/SanPhams/Edit/1069'>Edit</a> | <a href='/SanPhams/Details/" +
                        maSanPham +
                        "'>Details</a> | <a href='#' class='js-delete-product' data-product-id='" +
                        maSanPham +
                        "'>Delete</a>";
                    var newRow = "<tr><td> <input type='checkbox' name='chkProduct' value="+maSanPham+"/> </td><td>" +
                        sanPham.TenSanPham +
                        "</td><td>" +
                        sanPham.GiaSanPham +
                        "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>" +
                        actionLink +
                        "</td></tr>";
                    $("table tbody").prepend(newRow);
                    sanPhamsController.deleteProduct.init();
                })
                //post that bai
                .fail(function () {
                    alert("That bai");
                });

            //Bước 3: Cập nhật danh sách sản phẩm
        });

    }
    return {
        init: addProduct
    }
}();

//đóng mở form nhập nhanh sản phẩm
sanPhamsController.toggleAddProduct = function() {

    var toggleAddProduct = function() {
        //chỉ thực hiện khi các thành phần HTML đã sẵn sàng
        //toggle them nhanh san pham
        $('.create-sanpham-toggle h5').click(function () {
            //code xử lý
            $('.create-sanpham-toggle .widget-content').toggle();
        });
    }

    return {
        init: toggleAddProduct
    }
}();

//Xóa nhiều sản phẩm
sanPhamsController.deleteProductMultiple = function() {
    var deleteProductMultiple = function() {
        //delete multiple product by checkbox
        $(".js-delete-multiple-product").click(function () {
            var confirmDeleteProduct = confirm("Ban co chac xoa khong?");
            if (confirmDeleteProduct) {
                $("table tbody input[type='checkbox']:checked").each(function (i, el) {
                    if (el.value) {
                        $.ajax({
                            url: "/api/SanPhams/" + el.value,
                            type: "DELETE",
                            success: function () {
                                //tu dong thay doi bat dong bo DOM HTML

                                link.parents("tr").fadeOut(function () {
                                    $(this).remove();
                                });
                            },
                            error: function () {
                                alert("xoa that bai");
                            }
                        });
                    }
                });
            }           
        });
    }
    return {
        init: deleteProductMultiple
    }
}();