"use client"

import Link from 'next/link';

const AddTask = () => {
    return (
        <div>
            <Link href="/add-task">
                <button className="btn btn-primary w-full">
                    ADD NEW TASK
                </button>
            </Link>
        </div>
    )
}

export default AddTask;