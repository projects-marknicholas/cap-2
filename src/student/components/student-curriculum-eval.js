// CSS
import '../../assets/css/student/student-eval.css';

const StudentCurriculumEval = () => {
  return(
    <>
      <div className="container">
        <div className='student-curriculum-header'>
          <h1>Curriculum</h1>
          <div className='flex-curriculum'>
            <select>
              <option>All Years</option>
            </select>

            <select>
              <option>All Semesters</option>
            </select>
          </div>
        </div>
        <div className="student-evaluation">
          <h1>1st Year, 1st Semester Grade</h1>

          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Description</th>
                  <th>Lec Hours</th>
                  <th>Lab Hours</th>
                  <th>Lec Units</th>
                  <th>Lab Units</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1234</td>
                  <td>Introduction to Programming</td>
                  <td>3.0</td>
                  <td>3.0</td>
                  <td>3.0</td>
                  <td>3.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="student-evaluation">
          <h1>1st Year, 2nd Semester Grade</h1>

          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Description</th>
                  <th>Lec Hours</th>
                  <th>Lab Hours</th>
                  <th>Lec Units</th>
                  <th>Lab Units</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1234</td>
                  <td>Introduction to Programming</td>
                  <td>3.0</td>
                  <td>3.0</td>
                  <td>3.0</td>
                  <td>3.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="student-evaluation">
          <h1>2nd Year, 1st Semester Grade</h1>

          <div className="data-table">
            <table>
            <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Description</th>
                  <th>Lec Hours</th>
                  <th>Lab Hours</th>
                  <th>Lec Units</th>
                  <th>Lab Units</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1234</td>
                  <td>Introduction to Programming</td>
                  <td>3.0</td>
                  <td>3.0</td>
                  <td>3.0</td>
                  <td>3.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="student-evaluation">
          <h1>2nd Year, 2nd Semester Grade</h1>

          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Description</th>
                  <th>Lec Hours</th>
                  <th>Lab Hours</th>
                  <th>Lec Units</th>
                  <th>Lab Units</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1234</td>
                  <td>Introduction to Programming</td>
                  <td>3.0</td>
                  <td>3.0</td>
                  <td>3.0</td>
                  <td>3.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentCurriculumEval;