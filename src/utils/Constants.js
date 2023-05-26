const aroll = [].sort((a, b) => b.id - a.id)
for (let i = 1; i < 50; i++) {
    aroll.push({
        key: i,
        supplierCode: "NCC4555" + i.toString(),
        nameSupplier: 'Kho buôn Hoài Lương' + i.toString(),
        category: 'Ngành may mặc',
        barcode: "322",
        codeDebit: "111112021" + i.toString(),
        phoneLink: "0358749335",
        email: "kimthanh993@gmail.com",
        address: "72 Núi Thành, Đà Nẵng",
        status: 2,
        wards: "Hoà Thuận Đông",
        district: "Hải Châu",
        city: "Đà Nẵng",
        deleted: false,

    })

}

const GET_DATA = aroll;

const status = [];
status.push(
    { value: 0, text: "Tất cả" },
    { value: 1, text: "Giao dịch", color: "#008A5A" },
    { value: 2, text: "Tạm ngưng", color: "#F85555" },
)

const GET_STATUS = status;

const GET_TITLE_DATA = [
    {
        name: 'Mã NCC',
        dataIndex: 'supplierCode',
        css: {
            color: "#0054E1"
        }
    }, {
        name: 'Tên nhà cung cấp',
        dataIndex: 'nameSupplier',
        css: {
            color: "#333333"
        }
    }, {
        name: 'Danh mục',
        dataIndex: 'category',
        css: {
            color: "#333333"
        }
    }, {
        name: 'Mã code',
        dataIndex: 'barcode',
        css: {
            color: "#333333"
        }
    }, {
        name: 'Mã công nợ',
        dataIndex: 'codeDebit',
        css: { color: "#0054E1" }
    }, {
        name: 'Điện thoại',
        dataIndex: 'phoneLink',
        css: {
            color: "#333333"
        }
    }, {
        name: 'Email',
        dataIndex: 'email',
        css: {
            color: "#333333"
        }
    }
    , {
        name: 'Địa chỉ',
        dataIndex: 'address',
        css: {
            color: "#333333"
        }
    }];
export {
    GET_DATA,
    GET_STATUS,
    GET_TITLE_DATA
}
