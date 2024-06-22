'use client'
import React, { useState } from 'react'
import { DropDownBlankTransparent } from '../dropDown';
import Image from 'next/image'
import { InstallerImageUploader } from '../imageUploader';
import Alert from '../alert';

const PhotoUpload = () => {
    const [upload, setUpload] = useState({ jobNumber: '', img: '' })
    const [alert, setAlert] = useState({message: '', type: ''})
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        stage: false,
    });
    const [dropElements, setDropElements] = useState({
        stage: 'Select Upload Stage',
    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({ ...dropElements, [dropdown]: 'SELECT' });
    };

    const handleSelectDropdown = (dropdown: any, title: any) => {
        setDropElements({ ...dropElements, [title]: dropdown }); setDropMenus({ ...dropMenus, [title]: false })
    }

    function handleChange(e: any) {
        const name = e.target.name
        const value = e.target.value
        setUpload({ ...upload, [name]: value })
    }

    const handleUploadClick = () => {
        if (!upload.jobNumber) {
            console.log('Please enter job number first');
            setAlert({message:'Please enter Job Number', type:'error'})
            setTimeout(() => {
                setAlert({message:'', type: ''})
            }, 3000);
        }
    };

    return (
        <div className="relative w-full flex p-[10px] ">
            <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} {/* Display alert */}
            </span>

            <div className="w-full h-full flex flex-row items-start justify-start gap-[10px] pt-[20px]  ">
                <div className="w-1/2 flex flex-col items-start justify-start gap-[20px] h-full ">
                    <p className="text-xl font-semibold">Upload Project Photos</p>

                    <span className="w-full flex flex-col items-start justify-start gap-2 z-10">
                        <h4 className="text-md font-light">Select Upload Stage</h4>
                        <span className="h-[40px] w-full z-10">
                            <DropDownBlankTransparent handleSelectDropdown={handleSelectDropdown} title={'stage'} dropArray={['Before', 'During', 'After']} dropElements={dropElements} dropMenus={dropMenus} handleDropMenu={handleDropMenu} setDropElements={setDropElements} setDropMenus={setDropMenus} />
                        </span>
                    </span>

                    <p className="text-lg ">Uploaded Photos</p>
                    <div className="w-full flex flex-col items-start justify-start gap-[10px] uploaded-photos-cont overflow-y-auto pr-2">
                        <div className="w-full flex flex-col items-start justify-start gap-[10px] ">
                            {[{ url: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Before site condition' }, { url: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'During post setup' }].map((data, ind) => {
                                const { url, title } = data
                                return (
                                    <span key={ind} className="w-full flex flex-col items-start justify-start gap-3">
                                        <p className="text-md">{ind + 1}. {title}</p>
                                        <span className="relative  h-[300px] w-full rounded-[5px] overflow-hidden ">
                                            <Image
                                                src={url}
                                                alt="Logo"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </span>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col items-start justify-start gap-[8px] h-full  ">
                    <input type="text" className='normal-input' name='jobNumber' value={upload.jobNumber} onChange={handleChange} placeholder='Enter Job Number' />

                    <div className="w-full flex flex-col justify-start items-start gap-3 uploaded-photos-cont-2 ">
                        <span className="w-full h-full flex flex-col items-start justify-start gap-2">
                            <InstallerImageUploader id={'user-image'} title={"Upload Project Image"} url={'https://res.cloudinary.com/iroegbu-cloud-1/image/upload/v1718748903/u6wmwqvxzfinumomdfro.jpg'} disabled={!upload.jobNumber}
                                handleUploadClick={handleUploadClick} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoUpload
