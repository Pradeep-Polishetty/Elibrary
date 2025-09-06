import React, { useState } from 'react';
import { useSetRoleMutation } from '../../store/slices/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectCurrentToken } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import SvgStudent from '../../assets/student.svg';  
import SvgFaculty from '../../assets/professor.svg';

const RoleSelectionModal = () => {
  const [role, setRole] = useState('student');
  const [setRoleApi, { isLoading }] = useSetRoleMutation();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await setRoleApi({ role }).unwrap();
      dispatch(setCredentials({ user: updatedUser, token }));
      toast.success('Role selected successfully! Welcome.');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to set role.');
    }
  };

  return (
    <div 
      className="modal  show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border border-3 border-info-subtle shadow-lg bg-dark text-light">

          
          {/* Header */}
          <div className="modal-header border-0 pb-2">
            <h5 className="modal-title fs-2 text-primary ">
              Welcome to E-Library!
            </h5>
          </div>

          {/* Body */}
          <div className="modal-body px-4 py-4">
            <form onSubmit={handleSubmit}>
              <p className="fs-6 text-info  mb-4">
                Please select your role to personalize your library experience. 
                This selection is permanent and helps us tailor content for you.
              </p>

              {/* Role Selection */}
              <div className="mb-4">
                <label className="form-label text-primary fw-semibold mb-3">
                  I am a:
                </label>
                <div className="row g-3">
                  
                  {/* Student Card */}
                  <div className="col-6">
                    <div
                      className={`card h-100 border-2 ${
                        role === 'student' 
                          ? 'border-info bg-info bg-opacity-10' 
                          : 'border-secondary bg-dark'
                      }`}
                      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                      onClick={() => setRole('student')}
                    >
                      <div className="card-body text-center p-3">
                        <div className="mb-2 fs-1 text-info">
                          <img src={SvgStudent} alt="Student" className="mb-2" width="48" />

                        </div>
                        <h6 className="card-title mb-1 text-primary">
                          Student
                        </h6>
                        <small className="text-info text-opacity-75">
                          Access learning materials
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Faculty Card */}
                  <div className="col-6">
                    <div
                      className={`card h-100 border-2 ${
                        role === 'faculty' 
                          ? 'border-info bg-info bg-opacity-10' 
                          : 'border-secondary bg-dark'
                      }`}
                      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                      onClick={() => setRole('faculty')}
                    >
                      <div className="card-body text-center p-3">
                        <div className="mb-2 fs-1 text-info">
                        <img src={SvgFaculty} alt="Faculty" className="mb-2" width="48" />
                        </div>
                        <h6 className="card-title mb-1 text-primary">
                          Faculty
                        </h6>
                        <small className="text-info text-opacity-75">
                          Manage & share resources
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hidden Radio Buttons */}
                <input 
                  type="radio" 
                  name="role" 
                  value="student" 
                  checked={role === 'student'} 
                  onChange={(e) => setRole(e.target.value)}
                  className="d-none"
                />
                <input 
                  type="radio" 
                  name="role" 
                  value="faculty" 
                  checked={role === 'faculty'} 
                  onChange={(e) => setRole(e.target.value)}
                  className="d-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-outline-success btn-lg w-100 fw-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span 
                      className="spinner-border spinner-border-sm me-2" 
                      role="status" 
                      aria-hidden="true"
                    ></span>
                    Setting up your profile...
                  </>
                ) : (
                  'Get Started'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
