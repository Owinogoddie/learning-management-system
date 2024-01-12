'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import MuxPlayer from '@mux/mux-player-react'

import { Button } from "@/components/ui/button"

import { ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Chapter, MuxData } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'

interface VideoFormProps{
    initialData:Chapter &{muxData?:MuxData};
    courseId:string
    chapterId:string
}

const formSchema = z.object({
    videoUrl: z.string().min(2),
  })

  
export const ChapterVideoForm = ({chapterId,initialData,courseId}:VideoFormProps) => {
    const router=useRouter()

    const [isEditting,setIsEditing]=useState(false)
    const toggleEdit=()=>{
        setIsEditing(current=>!current)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          videoUrl: initialData?.videoUrl || "",
        },
      })

      const {isSubmitting,isValid}=form.formState
    
      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
           const resp= await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values)
           console.log(resp)
            toast.success("Chapter Updated")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something Went Wrong")
            
        }
      }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Chapter Video
            <Button onClick={toggleEdit}  variant="ghost">
                
                {isEditting &&  <>Cancel</>}
                {!isEditting && !initialData.videoUrl &&(
                  <>
                  <PlusCircle className="h-4 w-4 mr-2"/>
                  Add a video
                  </>
                )}
                {
                  !isEditting && initialData.videoUrl &&(
                    <>
                    <Pencil className="h-4 w-4 mr-2"/>
                 Edit Video</>
                    
                  )
               }
            </Button>
        </div>
        {
            !isEditting &&(
              !initialData.videoUrl?(
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                  <Video
                  className="h-10 w-10 text-slate-500"
                  />

                </div>
                
              ):(
                <div className="relative aspect-video mt-2">
                  <MuxPlayer
                  playbackId={initialData?.muxData?.playbackId || ""}
                  />
                </div>
              )
                
            )
        }
        {
            isEditting &&(
                <div>
                  <FileUpload
                  endpoint="ChapterVideo"
                  onChange={(url)=>{
                    if(url){
                      onSubmit({videoUrl:url})
                    }
                  }}
                  />
                  <div className="text-xs text-muted-foreground mt-4">
                    Upload this chapter's video
                  </div>
                </div>
            )
        }
        {initialData.videoUrl && !isEditting &&(
          <div className="text-xs text-muted-foreground mt-2">
            videos can take a few minutes to process.Refresh the page if video does not appear
          </div>
        )}
    </div>
  )
}
