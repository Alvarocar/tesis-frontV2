import { Drawer, DrawerContent, DrawerTrigger } from "@app/components/ui/drawer";
import { HambergerMenu } from "iconsax-react";

const ApplicantMenuDrawer = () => {
  return (
    <Drawer direction="left"  >
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="menu-de-opciones"
          className="pr-2"        
        ><HambergerMenu /></button>
      </DrawerTrigger>
      <DrawerContent className="w-fit" >
        <aside className="h-screen w-2">

        </aside>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplicantMenuDrawer;
