import { ItaliannoFont } from "@/constants";
import { jsPDF } from "jspdf"

var callAddFont = function () {
this.addFileToVFS('Italianno-Regular-normal.ttf', ItaliannoFont);
this.addFont('Italianno-Regular-normal.ttf', 'Italianno-Regular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
