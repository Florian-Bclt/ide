import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  // vérifie si l'utilisateur est auth
  const { userId } = auth();

  if(!userId){
    return redirect('/');
  }

  // vérifie qui est le créateur du cours
  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  })

  // vérifie que le cours existe
  if(!course){
    return redirect('/');
  }

  // Check les champs requis
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ];

  // Vérifie que les champs requis sont remplis
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})` // nombre de champs remplis par rapport au total

  return ( 
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Paramètres du cours
          </h1>
          <span className="text-sm text-slate-700">
            Champs requis {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">
              Personnalisation du cours 
            </h2>
          </div>
          <TitleForm 
            initialData={course}
            courseId={course.id}
          />
          <DescriptionForm 
            initialData={course}
            courseId={course.id}
          />
          <ImageForm 
            initialData={course}
            courseId={course.id}
          />
        </div>
      </div>
    </div>
   );
}
 
export default CourseIdPage;