import React, { Fragment } from 'react'

const getStatus = (time) => {
    const curDate = new Date()
    const info = new Date(time)
    if (curDate.getDate() > info.getDate()) {
        return <p className='inline-block font-medium text-red-500'>Expired</p>
    } else if (curDate.getTime() > info.getTime()) {
        return <p className='inline-block font-medium text-red-500'>Expired</p>
    } else {
        return <p className='inline-block font-medium text-green-500'>Available</p>
    }
}

const RequestInfo = ({ from, to, departAt, created_at }) => (
    <Fragment>
        <div className='p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md'>
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    From:
                </div>
                <div className='self-center text-left  ml-2'>{from}</div>
            </div>
            <hr />
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    To:
                </div>
                <div className='self-center text-left ml-2'>{to}</div>
            </div>
        </div>
        <div className='p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md '>
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    Leaving At:
                </div>
                <div className='self-center text-left ml-2'>{departAt}</div>
            </div>
            <hr />
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    Posted At:
                </div>
                <div className='self-center text-left ml-2'>{created_at}</div>
            </div>
        </div>
        <div className='p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md '>
            <div className='flex p-3 m-1 '>
                <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                    Status:
                </div>
                <div className='self-center text-left ml-2'>{getStatus(status)}</div>
            </div>
        </div>
    </Fragment>
)

export default RequestInfo
