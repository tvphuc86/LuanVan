import React, { useEffect, useState } from 'react';
import NavControl from '../../component/NavControl';
import SearchBar from '../../component/SearchBar';
import './HTVC.css';
import HTVCDataService from '../../service/hinhThucVanChuyen.js';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultImg from '../../asset/img/user.jpg';
import Pagination from '../../component/Pagination';
import navlinkQuanLy from './linkquanly';
const inintFileValue = {
  hinhThucVanCHuyenId: 0,
  ten: '',
  moTa: '',
  imageUrl: defaultImg,
  trangThai: true,
  imageFile: null,
  anh: '',
  mucChia: 0
};
function HTVC(props) {
  const [values, setValues] = useState(inintFileValue);
  const [errors, setError] = useState({});
  const [edit, setEdit] = useState(null);
  const [filter, setFilter] = useState('');
  const [model, setModel] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPage, setTotalPage] = useState();
  const [totalRecord, setTotalRecord] = useState(0);

  const htvcAPI = () => {
    return {
      getAll: HTVCDataService.getAll(filter),
      create: (newRecord) => HTVCDataService.create(newRecord),
      delete: (id) => HTVCDataService.delete(id),
      update: (id, data) => HTVCDataService.update(id, data),
    };
  };
  const addOrEdit = (formData, onSuccess) => {
    if (formData.get('hinhThucVanCHuyenId') == 0) {
      htvcAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          toast.success('Thêm thành công');
          retrieveData(filter, page, limit);
        })
        .catch((e) => {
          toast.error('Có lỗi khi thêm');
          console.log(e);
        });
    } else {
      htvcAPI()
        .update(formData.get('hinhThucVanCHuyenId'), formData)
        .then((res) => {
          onSuccess();
          toast.success('Cập nhật thành công');
          retrieveData(filter, page, limit);
        })
        .catch((e) => {
          console.log(e);
          toast.error('Có lỗi khi cập nhật');
        });
    }
  };
  useEffect(() => {
    retrieveData(filter, page, limit);
  }, [filter, page, limit]);

  useEffect(() => {
    if (edit != null) setValues(edit);
  }, [edit]);

  const retrieveData = (filter, page, limit) => {
    HTVCDataService.getAll(filter, page, limit).then((rs) => {
      setTotalRecord(rs.data.totalRecord);
      setTotalPage(rs.data.totalPage);
      setData(rs.data.result);
    });
  };
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };
  const showReview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageUrl: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imgFile: 'null',
        imageUrl: defaultImg,
      });
    }
  };
  const showModel = (htvc) => {};
  const showRecord = (data) => {
    setEdit(data);
  };
  const handleFilter = (e) => {
    const filterState = e.target.value;
    setFilter(filterState);
  };
  const validate = () => {
    let temp = {};
    temp.ten =
      values.ten == '' ? 'Vui lòng nhập tên hình thức vận chuyển' : true;
    temp.moTa =
      values.moTa == '' ? 'Vui lòng nhập mô tả hình thức vận chuyển' : true;
    temp.imageUrl = values.imageUrl == defaultImg ? 'Vui lòng chọn ảnh' : true;
    setError(temp);
    return Object.values(temp).every((x) => x == true);
  };
  const resetForm = () => {
    setValues(inintFileValue);
    document.getElementById('field-upload').value = null;
    setError({});
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('hinhThucVanCHuyenId', values.hinhThucVanCHuyenId);
      formData.append('ten', values.ten);
      formData.append('moTa', values.moTa);
      formData.append('anh', values.anh);
      formData.append('trangThai', values.trangThai);
      formData.append('imageFile', values.imageFile);
      formData.append('imageUrl', values.imageUrl);
      formData.append('mucChia',values.mucChia)
      addOrEdit(formData, resetForm);
    }
  };
  const handleDelete = (id) => {
    if (window.confirm('Bạn thực sự muốn xóa hình thức vận chuyển này') == true)
      HTVCDataService.delete(id)
        .then((rs) => {
          console.log(rs.data);
          rs.data
            ? toast.error('Không thể xóa bởi vì có dữ liệu liên quan')
            : toast.success('Xóa thành công');
          retrieveData(filter, page, limit);
          resetForm();
        })
        .catch((e) => {
          console.log(e.response);
          toast.error('Có lỗi khi xóa');
        });
  };
  const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';
  return (
    <div>
      <ToastContainer />
      <SearchBar username={props.username} />
      <NavControl links={navlinkQuanLy} />{' '}
      <div className="content">
        <h1 className="title-page">Quản lý hình thức vận chuyển</h1>
        <div className="search-and-form">
          <div className="form">
            <form
              autoComplete="off"
              noValidate
              onSubmit={handleFormSubmit}
              onReset={resetForm}>
              <fieldset className="formHtvc">
                <legend>
                  <h2>Thêm mới</h2>
                </legend>
                <div className="form-group">
                  <label>Tên</label>
                  <input
                    type={'text'}
                    placeholder="Nhập tên hình thức vận chuyển"
                    name="ten"
                    value={values.ten}
                    onChange={handleChangeInput}
                    className={applyErrorClass('ten')}
                  />
                </div>
                <sub className="errors-input">{errors.ten}</sub>
                <div className="form-group">
                  <label>Dữ liệu tính khối lượng</label>
                  <input
                    type={'number'}
                    placeholder="Nhập dữ liệu tính khối lượng"
                    name="mucChia"
                    value={values.mucChia}
                    onChange={handleChangeInput}
                    className={applyErrorClass('mucChia')}
                  />
                </div>
                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    placeholder="Nhập mô tả hình thức vận chuyển"
                    name="moTa"
                    value={values.moTa}
                    onChange={handleChangeInput}
                    className={applyErrorClass('moTa')}></textarea>
                </div>
                <sub className="errors-input">{errors.moTa}</sub>
                <div className="form-group">
                  <label>Hình ảnh</label>
                  <input
                    type={'file'}
                    accept="image/*"
                    onChange={showReview}
                    id="field-upload"
                  />
                </div>
                <sub className="errors-input">{errors.imageUrl}</sub>
                <img src={values.imageUrl} alt="" className="img-htvc" />
                <button type="submit">Lưu</button>
              </fieldset>
            </form>
          </div>
          <div className="list">
            <div className="search">
              <input
                type={'text'}
                placeholder="Nhập tên hoặc mô tả"
                onChange={handleFilter}
              />
            </div>
            <p className="total-table">Tổng số: {totalRecord}</p>
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th colSpan={2}></th>
                </tr>
              </thead>
              <tbody>
                {data.map((htvc, index) => {
                  return (
                    <tr key={index}>
                      <td>{htvc.ten}</td>
                      <td>{htvc.moTa}</td>
                      <td className="action-row" colSpan={2}>
                        <GrUpdate
                          title="Cập nhật"
                          onClick={() => {
                            showRecord(htvc);
                          }}
                        />
                        <AiOutlineDelete
                          onClick={() => handleDelete(htvc.hinhThucVanCHuyenId)}
                          title="Xóa"
                        />{' '}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              page={page}
              limit={limit}
              totalPage={totalPage}
              handleChangePage={handleChangePage}
              handleChangeLimitPage={handleChangeLimitPage}
              siblings={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HTVC;
