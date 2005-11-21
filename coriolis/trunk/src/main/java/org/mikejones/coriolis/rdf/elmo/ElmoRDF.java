/*
 * Created on 21-Nov-2005
 * Author adam
 * TODO Insert list of further regular items here
 */
package org.mikejones.coriolis.rdf.elmo;

import java.io.IOException;

import org.apache.tapestry.annotations.InjectPage;
import org.apache.tapestry.annotations.InjectState;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;
import org.mikejones.coriolis.tapestry.pages.EditPost;
import org.openrdf.elmo.model.foaf.Person;
import org.openrdf.elmo.model.foaf.PersonWriter;
import org.openrdf.elmo.repository.ElmoSession;
import org.openrdf.model.URI;
import org.openrdf.rio.RdfDocumentWriter;
import org.openrdf.rio.rdfxml.AbbreviatedRdfXmlWriter;



public abstract class ElmoRDF {

    
    @InjectPage("Layout")
    public abstract EditPost getLayout();
    
    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
 

public void CreateRDF(){
    ElmoSession session = new ElmoSession(); 
    URI jackURI = session.createURI("http://www.jackandjill.example.org/#jack"); 
             
    Person jack = (Person) session.getInstance(jackURI, Person.class); 
     
    jack.setName(session.createLiteral("Jack"));
    jack.setMbox(session.createURI("mailto:jack@jackandjill.example.org"));
    jack.setMbox(session.createURI("mailto:jack@work.example.org")); 
       
    RdfDocumentWriter writer = new AbbreviatedRdfXmlWriter(System.out);
    try {
    writer.setNamespace("foaf", Person.FOAF_NS); 
    writer.startDocument(); 
    new PersonWriter().writeRDF(writer, jack); 
    writer.endDocument();
    }
    catch (IOException ioe){
        
    }
}

}
