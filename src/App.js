import { createRef, useState } from "react";
import { SKILLS } from './skills';
import { WithContext as ReactTags } from 'react-tag-input';
import Pdf from "react-to-pdf";
import { Button, Form } from "react-bootstrap";
import AddLineIcon from 'remixicon-react/AddLineIcon';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import MailFillIcon from 'remixicon-react/MailFillIcon';
import PhoneFillIcon from 'remixicon-react/PhoneFillIcon';


const suggestions = SKILLS.map((skill) => {
  return {
    id: skill,
    text: skill,
  };
});


function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [educationData, setEducationData] = useState([]);
  const [institute, setInstitute] = useState('');
  const [eduYear, setEduYear] = useState('');
  const [degree, setDegree] = useState('');

  const [experienceData, setExperienceData] = useState([]);
  const [company, setCompany] = useState('');
  const [expYear, setExpYear] = useState('');
  const [designation, setDesignation] = useState('');

  const [personalData, setPersonalData] = useState([]);
  const [tags, setTags] = useState([]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const ref = createRef()
  const addEducationData = () => {
    const items = [...educationData];
    items.push({
      institute,
      eduYear,
      degree,
    });

    setInstitute('');
    setEduYear('');
    setDegree('');
    setEducationData(items);
  }

  const addExperienceData = () => {
    const items = [...experienceData];
    items.push({
      company,
      expYear,
      designation,
    });

    setCompany('');
    setExpYear('');
    setDesignation('');
    setExperienceData(items);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setPersonalData([{ name, email, phone, address }]);
    console.log(personalData);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  }

  const removeEducationData = index => {
    setEducationData(educationData.filter((_, i) => i !== index))
  }
  const removeExperienceData = index => {
    setExperienceData(experienceData.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1 className="py-8 font-bold text-center w-full items-center text-5xl tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        Resume Builder
      </h1>
      <Form className="flex flex-col items-center text-center">
        <h1 className="font-bold text-center w-full text-xl tracking-wide bg-gradient-to-r text-black">Personal info</h1>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text" placeholder="Enter Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 w-1/4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email" placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <h1 className="font-bold text-center w-full text-xl tracking-wide bg-gradient-to-r text-black">Education Details</h1>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Name of Institute</Form.Label>
          <Form.Control type="text" placeholder="Enter Name of Institute"
            value={institute}
            onChange={e => setInstitute(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Year of Gradutaion</Form.Label>
          <Form.Control type="date" placeholder="Enter Year of Gradutaion"
            value={eduYear}
            onChange={e => setEduYear(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Name of Degree</Form.Label>
          <Form.Control type="text" placeholder="Enter Name of Degree"
            value={degree}
            onChange={e => setDegree(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit"
          onClick={addEducationData}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-full"
        >
          <AddLineIcon />
        </Button>
        {
          educationData.length !== 0 && (
            <div className="flex gap-3 pt-2">

              {
                educationData.map((item, index) => (
                  <span
                    className="flex cursor-pointer space-x-2 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-1 px-3 rounded-full"
                    key={index}
                  >
                    <span>{item.institute}</span>
                    <span
                      onClick={() => removeEducationData(index)}
                      className="hover:text-black"
                    ><CloseLineIcon /></span>
                  </span>
                ))
              }
            </div>
          )
        }
        <h1 className="font-bold text-center w-full text-xl tracking-wide bg-gradient-to-r text-black  pt-3">Experience Details</h1>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Name of company</Form.Label>
          <Form.Control type="text" placeholder="Enter Name of company"
            value={company}
            onChange={e => setCompany(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Year of Work</Form.Label>
          <Form.Control type="date" placeholder="Enter Year of Work"
            value={expYear}
            onChange={e => setExpYear(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Name of Designation</Form.Label>
          <Form.Control type="text" placeholder="Name of Designation"
            value={designation}
            onChange={e => setDesignation(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit"
          onClick={addExperienceData}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-full"
        >
          <AddLineIcon />
        </Button>
        {
          experienceData.length !== 0 && (
            <div className="flex gap-3 pt-2">

              {
                experienceData.map((item, index) => (
                  <span
                    className="flex cursor-pointer space-x-2 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-1 px-3 rounded-full"
                    key={index}
                  >
                    <span>{item.company}</span>
                    <span
                      onClick={() => removeExperienceData(index)}
                      className="hover:text-black"
                    ><CloseLineIcon /></span>
                  </span>
                ))
              }
            </div>
          )
        }
        <h1 className="font-bold text-center w-full text-xl tracking-wide bg-gradient-to-r text-black  pt-3">Skills</h1>
        <Form.Group className="mb-3 w-1/4" controlId="formBasic">
          <Form.Label>Name Skills</Form.Label>
          <ReactTags
            classNames={{
              tags: '',
              tagInput: 'pt-3',
              tagInputField: 'w-full  border border-gray-400 text-black font-normal py-1 px-3 rounded-sm',
              selected: '',
              tag: 'm-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-3 rounded-full ',
              remove: 'removeClass',
              clearAll: '',
            }}
            tags={tags}
            suggestions={suggestions}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            inputFieldPosition="bottom"
            autocomplete
          />
        </Form.Group>
        <Button variant="primary" type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <div className="flex justify-center pt-5">
        <Pdf targetRef={ref} filename="resume.pdf">
          {({ toPdf }) => <Button variant="primary" type="submit" onClick={toPdf}>Download Pdf</Button>}
        </Pdf>
      </div>
      <div id="resume" className="pt-10">
        <div ref={ref} className="pb-10">
          {personalData.map((item, index) => (
            <h1 key={index} className="font-CalibriBold px-10 pt-10 pb-3 w-full text-5xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">{item.name}</h1>
          ))}
          <div className="flex px-10 space-x-20 py-3">
            <div className="flex-initial w-56">
              <div className="">
                <h2 className="font-CalibriBold text-xl text-blue-600">Personal Information</h2>
                {personalData.map((item, index) => (
                  <div key={index}>
                    <p className="font-CalibriRegular text-black text-base">{item.address}</p>
                    <div className="flex space-x-2 text-blue-600">
                      <MailFillIcon className="" />
                      <p className="font-CalibriRegular text-base pt-0.5">{item.email}</p>
                    </div>
                    <div className="flex  space-x-2 text-blue-600">
                      <PhoneFillIcon className="" />
                      <p className="font-CalibriRegular text-base pt-0.5">{item.phone}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="font-CalibriBold text-xl text-blue-600 pt-10">Technical Skills</h2>
                {tags.map((item, index) => (
                  <p key={index} className="font-CalibriBold text-black text-base">{item.text}</p>
                ))}
              </div>
            </div>
            <div className="flex-1 w-56">
              <div>
                <h2 className="font-CalibriBold text-xl text-blue-600">Education</h2>
                {educationData.map((item, index) => (
                  <div key={index}>
                    <div>
                      <p className="font-CalibriBold text-black text-base">{item.degree}</p>
                      <p className="font-CalibriItalic text-black text-base">{item.institute}</p>
                      <p className="font-CalibriRegular text-black opacity-50 text-base">{item.eduYear}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="font-CalibriBold text-xl text-blue-600 pt-10">Work Experience</h2>
                {experienceData.map((item, index) => (
                  <div key={index}>
                    <div>
                      <p className="font-CalibriBold text-black text-base">{item.designation}</p>
                      <p className="font-CalibriItalic text-black text-base">{item.company}</p>
                      <p className="font-CalibriRegular text-black opacity-50 text-base">{item.expYear}</p>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
