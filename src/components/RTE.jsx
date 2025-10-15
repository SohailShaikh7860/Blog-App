import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name,control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller 
      name={name || "content"}
      control={control}
      render={({field : {onChange}})=>(
        <Editor 
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: false,
            plugins: [
              "image",
                "link",
                "lists",
                "table",
                "autoresize",
                "advlist",
                "wordcount",
                "help",
                "code",
                "help",
                "emoticons",
                "anchor",
                "charmap",
                "codesample",
                "directionality",
                "fullscreen",
                "insertdatetime",
                "media",
                "nonbreaking",
                "pagebreak",
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onChange}
        />
      )}
        />
    </div>
  )
}

export default RTE
