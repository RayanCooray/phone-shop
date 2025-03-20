import React from "react";
import { Mail, Phone, User, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="relative w-full py-20 flex items-center justify-center">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full px-6 md:px-12">
    
        <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            className="w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed/v1/place?key=[your.api.key]q=Colombo,Sri+Lanka"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-amber-500 text-center mb-4">Contact Us</h2>
          <p className="text-gray-300 text-center mb-6">
            Get in touch with us for any inquiries or support.
          </p>

          <form className="space-y-4">
            {/* Name */}
            <div className="flex items-center space-x-3">
              <User className="text-amber-500" />
              <Input type="text" placeholder="Your Name" className="bg-gray-800 text-white" required />
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <Mail className="text-amber-500" />
              <Input type="email" placeholder="Your Email" className="bg-gray-800 text-white" required />
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3">
              <Phone className="text-amber-500" />
              <Input type="tel" placeholder="Your Phone" className="bg-gray-800 text-white" />
            </div>

            {/* Message */}
            <div className="flex items-start space-x-3">
              <MessageCircle className="text-amber-500 mt-1" />
              <Textarea placeholder="Your Message" className="bg-gray-800 text-white resize-none" required />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-amber-500 text-black font-semibold hover:bg-amber-400">
              Send Message
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
