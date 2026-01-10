import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { createNewDiscussion } from "@/state/discussion/discussionSlice";
import type { AppDispatch } from "@/state/store";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

const CreateDiscussionDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarGroupAction title="Add discussion">
          <Plus /> <span className="sr-only">Add discussion</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new discussion</DialogTitle>
          <DialogDescription>
            Give a name to your new discussion
          </DialogDescription>
        </DialogHeader>
        <div>
          <form
            onSubmit={(e) => {
              // e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get("name") as string;
              dispatch(createNewDiscussion(name));
            }}
          >
            <Input
              id="discussionName"
              name="name"
              type="text"
              placeholder="Enter the name here..."
            ></Input>
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDiscussionDialog;
