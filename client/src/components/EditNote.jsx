import { useFormik } from 'formik';
import axios from 'axios';
import React, { useEffect } from 'react'
import { env } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


function EditNote() {
  const params = useParams()
  const navigate = useNavigate()

  //Alert function;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const formik = useFormik({
    initialValues: {

      title: "",
      content: "",
      date: ""
    },
    validate: (values) => {
      let errors = {};

      if (values.title === "") {
        errors.title = "Please enter Title"
      }
      if (values.content === "") {
        errors.content = "Please enter Content"
      }
      if (values.date === "") {
        errors.date = "Please select Date"
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        if (window.localStorage.getItem("app-token")) {
          await axios.put(`${env.api}/api/notes/${params.id}`, values, {
            headers: { Authorization: window.localStorage.getItem("app-token") },
          });

        }
        Toast.fire({ icon: 'success', title: 'Edited' })
        navigate("/portal/home")

      } catch (err) {
        window.location.href = "/"
      }
    }


  })


  useEffect(() => {
    getNote()
// eslint-disable-next-line
  }, [])

  let getNote = async () => {
    try {
      let note = await axios.get(`${env.api}/api/notes/${params.id}`, {
        headers: { Authorization: window.localStorage.getItem("app-token") },
      });
      formik.setValues(
        {
          title: note.data.title,
          content: note.data.content,
          date: note.data.date

        }
      )


    } catch (error) {
      window.location.href = "/"
    }
  }
  return (
    <>
      <div className='container bg-dashboard'>
        <div className="d-flex align-items-center justify-content-center pt-5 mb-4">
          <h1 className="h3 mb-0 text-dark-800">Edit Note</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='row '>
            <div className="col-lg-6 mx-auto">
              <div className='  pb-3'>
                <label>TITLE</label>
                <input
                  className={`form-control ${formik.errors.title ? `input-error` : ``}`}
                  type={'text'}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  name="title"
                />
                <span style={{ color: "red" }}>{formik.errors.title}</span>
              </div>
              <div className=' pb-3'>
                <label>CONTENT</label>
                <textarea
                  className='form-control'
                  type={'text'}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  name="content"
                />
                <span style={{ color: "red" }}>{formik.errors.content}</span>
              </div>
              <div className=' pb-5'>
                <label>DATE</label>
                <input
                  className='form-control'
                  type={'date'}
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  name="date"
                />
              </div>
              <div className='text-center '>

                <input
                  className='btn btn-outline-primary'
                  type={'submit'}
                  value='Submit'
                  disabled={!formik.isValid}
                />

              </div>
            </div>

          </div>
        </form>
      </div>

    </>
  )
}

export default EditNote;