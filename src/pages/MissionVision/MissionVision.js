import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth/useAuth';
import Hearder from '../CommonSections/Header/Hearder';
import UnLoggedHeader from '../CommonSections/UnLoggedHeader/UnLoggedHeader';

const MissionVision = () => {
  useEffect(()=>{
    document.title = "Mission and Vision of this site";
  }, []);

  const {user} = useAuth();
  return (

    <>
      {
        user ? <Hearder /> : <>
              <UnLoggedHeader />
        </>
      } 

      <section className="py-4">
        <Container>
          <h3 className="styled-heading text-success mb-4 border-bottom pb-2">Mission and Vision:</h3>
          <p className='small' style={{textAlign:"justify"}}>
            আমরা সমাজকর্মের ৪টি বা ৫টি ব্যাচের স্টুডেন্ট আছি। একজনের পক্ষে সবার সম্পর্কে বিস্তারিত জানা এবং সেই তথ্যগুলো মনে রাখা প্রায় অসম্ভম। আবার গুরুত্বপূর্ণ প্রয়োজনের সময় আমরা কোনো স্টুডেন্ট সম্পর্কে সঠিক তথ্য পাই না। এই অসুবিধা গুলো লাঘব করাই আমার/আমাদের মূল লক্ষ। এখানে খুব সহজে আমরা একটি একাউন্ট করে আমরা নিজের তথ্যগুলো রাখতে পারব। এবং আমাদের সকল এখানে যথাযথ নিরাপদ থাকবে। প্রয়োজনীয় ক্ষেত্রে এসব তথ্য আমরা ব্যবহার করতে পারব।
          </p>
          <p className='small' style={{textAlign:"justify"}}>
            এতে আমাদের কিছু গুরুত্বপূর্ণ তথ্য একসাথে এক জায়গায় রাখতে পারবো, যেমন, নিজের কন্টাক্ট নাম্বার, রক্তের গুপ, স্থায়ী এবং বর্তমান ঠিকানা, যা আমাদের নিজেদের বিভিন্ন ছোট বা বড় কাজে লাগবে। এছাড়া আমারা একে অন্যরে সম্পর্কে আরো ভালো জানতে পাবে, এতে করে আমাদের মধ্যকার সম্পর্কগুলো আরো সংগঠিত হবে। অন্যকথায় বলতে পারি এটি আমাদের নিজেদের মধ্যে তথ্য শেয়ার করার একটি মাধ্যম।
          </p>
        </Container>
      </section>
      {/*  */}
    </>
  );
};

export default MissionVision;