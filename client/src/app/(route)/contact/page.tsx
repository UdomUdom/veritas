import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, PhoneIcon, SendIcon, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6  mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-center prose prose-neutral dark:prose-invert">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg p-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Reach out to us through the following channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MailIcon className="h-5 w-5 text-primary" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Lak Hok, Mueang Pathum Thani , 12000</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-none ">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below to get in touch with us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input type="text" placeholder="Your Name" required />
                <Input type="email" placeholder="Your Email" required />
                <Textarea placeholder="Your Message" rows={5} required />
                <Button type="submit" className="w-full">
                  <SendIcon className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="w-full mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.858792386536!2d100.58541590000002!3d13.9670095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2816f1377fc17%3A0x63d330b7f8af6e16!2sRangsit%20University!5e0!3m2!1sen!2sth!4v1744313268919!5m2!1sen!2sth"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rangsit University Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
