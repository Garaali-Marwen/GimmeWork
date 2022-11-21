package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.OffresPublic;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class OffrePublicService {


    public List<OffresPublic> getPrivateOffre() throws IOException {
        return Jsoup.connect("https://www.keejob.com/").get()
                .getElementsByClass("block_white")
                .stream()
                .filter(o->o.getElementsByTag("a").size()>2)
                .map(o->extractInfo(o))
                .toList();
    }


    private OffresPublic extractInfo(Element offer){
        OffresPublic o = new OffresPublic();
        //title
        Elements elements = offer.getElementsByTag("a");
        String title = elements.get(1).text();
        o.setTitle(title);
        //link
        Element link = offer.getElementsByTag("a").get(1);
        String linkHref = link.attr("href");
        o.setLink("https://www.keejob.com"+linkHref);
        //company
        Elements elements1 = offer.getElementsByTag("a");

        String companyName = elements.get(2).text();
        o.setCompany(companyName);

        //image
        Element  imageElement=offer.getElementsByTag("img").get(0);
        String absoluteUrl = imageElement.absUrl("src");  //absolute URL on src
        o.setImage(absoluteUrl);
        o.setSource("keejob");
        return o;
    }


    public List<OffresPublic> getPrivateOffreFromOtionCarriere() throws IOException {
        return Jsoup.connect("https://www.optioncarriere.tn/recherche/emplois?s=&l=Tunisie")
                .get()
                .getElementsByTag("article")
                .stream()
                .map(o->extractInfoFromOtionCarriere(o))
                .toList();
    }


    private OffresPublic extractInfoFromOtionCarriere(Element offer){
        OffresPublic  o=new OffresPublic();
        //link
        var title=offer.getElementsByTag("a").get(0).text();
        o.setTitle(title);
        var company=offer.getElementsByTag("p").text();
        o.setCompany(company);
        Element link = offer.getElementsByTag("a").get(0);
        String linkHref = link.attr("href");
        linkHref="https://www.optioncarriere.tn"+linkHref;
        o.setLink(linkHref);
        o.setSource("OtionCarriere");

        return o;
    }




    public void setDetails_kj(OffresPublic o) throws IOException {

        String link=o.getLink();

        var det = Jsoup.connect(link).get();

        var  details= det.getElementsByClass("dl-horizontal");


        for (Element detail: details){
            var sector=detail.getElementsByTag("dd").get(0).text();
            var location=detail.getElementsByTag("dd").get(3).text();
            o.setSector(sector);
            if (location.length()==4)
                location=detail.getElementsByTag("dd").get(4).text();
            o.setLocation(location);
            //type

        }

    }
    public void setDetails_li(OffresPublic o) throws IOException {

        String link = o.getLink();

        var det = Jsoup.connect(link).get();
        var details = det.getElementsByClass("container");
        for (Element detail : details) {
            var sector = detail.getElementsByTag("p").get(0).text();
            var location = detail.getElementsByTag("li").get(0).text();
            var type = detail.getElementsByTag("li").get(1).text();
            o.setSector(sector);
            o.setLocation(location);
            if (type.length() < 8)
                o.setType(type);
        }


    }
    public void setDetails_oc(OffresPublic o) throws IOException {

        String link=o.getLink();

        var det = Jsoup.connect(link).get();
        var  details= det.getElementsByClass("container");
        for (Element detail: details) {
            var sector = detail.getElementsByTag("p").get(0).text();
            var location = detail.getElementsByTag("li").get(0).text();
            var type = detail.getElementsByTag("li").get(1).text();
            o.setSector(sector);
            o.setLocation(location);
            if (type.length() < 8)
                o.setType(type);

        }
    }
















    public List<OffresPublic> getPrivateOffreFromLinkedin() throws IOException {
        return Jsoup.connect("https://www.linkedin.com/jobs/search?keywords=&location=Tunisie&geoId=102134353&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0").get()
                .getElementsByClass("base-card relative w-full hover:no-underline focus:no-underline base-card--link base-search-card base-search-card--link job-search-card")
                .stream()
                .map(o->extractInfoFromLinkedin(o))
                .toList();
    }

    private OffresPublic extractInfoFromLinkedin(Element offer){
        OffresPublic  o=new OffresPublic();

        //link
        Element link = offer.getElementsByTag("a").get(0);
        String linkHref = link.attr("href");
        o.setLink(linkHref);
        //image
        Element  imageElement=offer.getElementsByTag("img").get(0);
        String absoluteUrl = imageElement.absUrl("data-delayed-url");  //absolute URL on src
        o.setImage(absoluteUrl);
        //title

        var title =offer.getElementsByTag("h3").text();
        o.setTitle(title);
        // company
        Elements elements = offer.getElementsByTag("a");
        String companyName = elements.get(1).text();
        o.setCompany(companyName);
        o.setSource("Linkedin");
        return o;
    }


}
