"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AddTaskForm = () => {
  return (
    <div>
      <Link href="/add-task">
        <Button className="w-full">
          ADD NEW TASK
        </Button>
      </Link>
    </div>
  );
};

export default AddTaskForm;